import type { Patient } from "../models/patient.model.js";
import type { Student } from "../models/student.model.js";

export interface PatientResponseDto {
  id: number;
  name: string;
  last_name: string;
  email: string;
  dni: string;
  students?: Student[];
}

export function toPatientResponseDto(
  patient: Patient,
  options?: { includeStudents?: boolean },
): PatientResponseDto {
  const dto: PatientResponseDto = {
    id: patient.id,
    name: patient.name,
    last_name: patient.last_name,
    email: patient.email,
    dni: patient.dni,
    students: patient.students
  };

  if (options?.includeStudents && patient.students !== undefined) {
    dto.students = patient.students;
  }

  return dto;
}