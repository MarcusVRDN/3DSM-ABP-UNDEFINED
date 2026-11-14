import { Injectable } from "@nestjs/common";
import type { Prisma } from "../../generated/prisma/client";
import { PrismaService } from "../../database/prisma.service";
import { converterPeriodo } from "./date-conversion.helper";
import { MetricaRanking, RankingQueryDto } from "./dto/ranking-query.dto";

interface ServicoRanking {
  servicoId: number;
  nome: string;
  valor: number;
  quantidadeColetas: number;
}

interface ItemRanking extends ServicoRanking {
  posicao: number;
}

interface ServicoSemDados {
  servicoId: number;
  nome: string;
}

export interface RankingResultado {
  metrica: MetricaRanking;
  ranking: ItemRanking[];
  semDados: ServicoSemDados[];
}

@Injectable()
export class RankingService {
  constructor(private readonly prisma: PrismaService) {}

  async obterRanking(query: RankingQueryDto): Promise<RankingResultado> {
    const { inicio: dataInicio, fim: dataFim } = converterPeriodo(query);
    const metrica = query.metrica ?? MetricaRanking.ENERGIA;
    const campoMetrica =
      metrica === MetricaRanking.EMISSAO ? "emissaoGCo2e" : "energiaKwh";

    const where: Prisma.ColetaWhereInput = {
      estadoCalculo: "CONCLUIDO",
      iniciadaEm: { gte: dataInicio, lte: dataFim },
      [campoMetrica]: { not: null },
    };

    const [servicos, coletas] = await Promise.all([
      this.prisma.servico.findMany(),
      this.prisma.coleta.groupBy({
        by: ["servicoId"],
        where,
        _sum: { energiaKwh: true, emissaoGCo2e: true },
        _count: { id: true },
      }),
    ]);

    const agregadosPorServico = new Map<
      number,
      { valor: number; quantidadeColetas: number }
    >();

    for (const coleta of coletas) {
      const valor = coleta._sum[campoMetrica];
      if (valor !== null && Number.isFinite(valor)) {
        agregadosPorServico.set(coleta.servicoId, {
          valor,
          quantidadeColetas: coleta._count.id,
        });
      }
    }

    const ranking: ServicoRanking[] = [];
    const semDados: ServicoSemDados[] = [];

    for (const servico of servicos) {
      const agregado = agregadosPorServico.get(servico.id);
      if (agregado === undefined) {
        semDados.push({ servicoId: servico.id, nome: servico.nome });
        continue;
      }

      ranking.push({
        servicoId: servico.id,
        nome: servico.nome,
        valor: agregado.valor,
        quantidadeColetas: agregado.quantidadeColetas,
      });
    }

    ranking.sort(
      (a, b) =>
        b.valor - a.valor ||
        a.nome.localeCompare(b.nome, "pt-BR") ||
        a.servicoId - b.servicoId,
    );

    semDados.sort(
      (a, b) =>
        a.nome.localeCompare(b.nome, "pt-BR") || a.servicoId - b.servicoId,
    );

    const rankingLimitado = ranking.slice(0, query.limite ?? 10);

    return {
      metrica,
      ranking: rankingLimitado.map((servico, indice) => ({
        ...servico,
        posicao: indice + 1,
      })),
      semDados,
    };
  }
}
