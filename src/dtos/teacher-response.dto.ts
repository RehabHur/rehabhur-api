import type { Teacher } from "../models/teacher.model.js";

export interface TeacherResponseDto {
    id: number;
    name: string;
    lastName: string;
    email: string;
    dni: string;
    comision: number;
}

export function toTeacherResponseDto(teacher: Teacher): TeacherResponseDto {
    return {
        id: teacher.id,
        name: teacher.name,
        lastName: teacher.lastName,
        email: teacher.email,
        dni: teacher.dni,
        comision: teacher.comision,
    };
}