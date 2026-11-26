import type { Commission } from "../models/comission.model.js";

export interface CommissionResponseDto {
  id: number;
  name: string;
  year: number;
  turno: string;
  cuatrimestre: number;
  createdAt: Date;
}

export function toCommissionResponseDto(
  commission: Commission,
): CommissionResponseDto {
  return {
    id: commission.id,
    name: commission.name,
    year: commission.year,
    turno: commission.turno,
    cuatrimestre: commission.cuatrimestre,
    createdAt: commission.createdAt,
  };
}
