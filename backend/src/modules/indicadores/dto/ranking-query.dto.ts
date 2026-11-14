import { Type } from "class-transformer";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsOptional, Max, Min } from "class-validator";
import { PeriodoDto } from "./periodo.dto";

export enum MetricaRanking {
  ENERGIA = "energia",
  EMISSAO = "emissao",
}

export class RankingQueryDto extends PeriodoDto {
  @ApiPropertyOptional({ enum: MetricaRanking })
  @IsOptional()
  @IsEnum(MetricaRanking)
  metrica?: MetricaRanking;

  @ApiPropertyOptional({
    type: Number,
    minimum: 1,
    maximum: 100,
    default: 10,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(100)
  @Type(() => Number)
  limite = 10;
}
