import type { Teacher } from "../models/teacher.model.js";
import { type CommissionResponseDto, toCommissionResponseDto } from "./comission-response.dto.js";

export interface TeacherResponseDto {
  id: number;
  name: string;
  last_name: string;
  email: string;
  dni: string;
  commissions: CommissionResponseDto[];//Siempre presente, aunque sea []
}

export function toTeacherResponseDto(teacher: Teacher): TeacherResponseDto {
  return {
    id: teacher.id,
    name: teacher.name,
    last_name: teacher.last_name,
    email: teacher.email,
    dni: teacher.dni,
    // Si teacher.commissions existe, lo mapea; si no, devuelve un array vacío
    commissions: teacher.commissions?.map(toCommissionResponseDto) ?? [],
  };
}