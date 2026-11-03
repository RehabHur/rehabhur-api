import type { Teacher } from "../models/teacher.model.js";

export interface TeacherResponseDto {
    id: number;
    name: string;
    last_name: string;
    email: string;
    dni: string;
    commission: number;
}

export function toTeacherResponseDto(teacher: Teacher): TeacherResponseDto {
    return {
        id: teacher.id,
        name: teacher.name,
        last_name: teacher.last_name,
        email: teacher.email,
        dni: teacher.dni,
        commission: teacher.commission,
    };
}