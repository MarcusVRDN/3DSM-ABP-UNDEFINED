jest.mock("../../database/prisma.service", () => ({
  PrismaService: class PrismaService {},
}));

import { PrismaService } from "../../database/prisma.service";
import { MetricaRanking, RankingQueryDto } from "./dto/ranking-query.dto";
import { RankingService } from "./ranking.service";

describe("RankingService", () => {
  const inicio = "2026-11-01T00:00:00.000Z";
  const fim = "2026-11-08T00:00:00.000Z";
  const findMany = jest.fn();
  const groupBy = jest.fn();
  const service = new RankingService({
    servico: { findMany },
    coleta: { groupBy },
  } as unknown as PrismaService);

  beforeEach(() => {
    findMany.mockReset().mockResolvedValue([
      { id: 1, nome: "Beta" },
      { id: 2, nome: "Alpha" },
      { id: 3, nome: "Zulu" },
      { id: 4, nome: "Gamma" },
      { id: 5, nome: "Sem coleta" },
    ]);
    groupBy.mockReset().mockResolvedValue([
      {
        servicoId: 1,
        _sum: { energiaKwh: 10, emissaoGCo2e: 2 },
        _count: { id: 3 },
      },
      {
        servicoId: 2,
        _sum: { energiaKwh: 4, emissaoGCo2e: 8 },
        _count: { id: 2 },
      },
      {
        servicoId: 3,
        _sum: { energiaKwh: 5, emissaoGCo2e: 8 },
        _count: { id: 4 },
      },
      {
        servicoId: 4,
        _sum: { energiaKwh: 1, emissaoGCo2e: 4 },
        _count: { id: 1 },
      },
    ]);
  });

  it("usa a métrica escolhida, ordena por valor e nome e separa serviços sem dados", async () => {
    const query = Object.assign(new RankingQueryDto(), {
      inicio,
      fim,
      metrica: MetricaRanking.EMISSAO,
      limite: 3,
    });

    await expect(service.obterRanking(query)).resolves.toEqual({
      metrica: MetricaRanking.EMISSAO,
      ranking: [
        {
          posicao: 1,
          servicoId: 2,
          nome: "Alpha",
          valor: 8,
          quantidadeColetas: 2,
        },
        {
          posicao: 2,
          servicoId: 3,
          nome: "Zulu",
          valor: 8,
          quantidadeColetas: 4,
        },
        {
          posicao: 3,
          servicoId: 4,
          nome: "Gamma",
          valor: 4,
          quantidadeColetas: 1,
        },
      ],
      semDados: [{ servicoId: 5, nome: "Sem coleta" }],
    });

    expect(findMany).toHaveBeenCalledWith();
    expect(groupBy).toHaveBeenCalledWith({
      by: ["servicoId"],
      where: {
        estadoCalculo: "CONCLUIDO",
        iniciadaEm: {
          gte: new Date(inicio),
          lte: new Date(fim),
        },
        emissaoGCo2e: { not: null },
      },
      _sum: { energiaKwh: true, emissaoGCo2e: true },
      _count: { id: true },
    });
  });
});
