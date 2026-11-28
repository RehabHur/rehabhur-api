import type { Commission, Patient } from "../generated/prisma/client.js";
import type { Student } from "../models/student.model.js";

export type StudentWithRelations = Omit<Student, "commission" | "patients"> & {
  commissionId?: number | null;
  commission?: Commission | null;
  patients?: Patient[];
};

export interface StudentResponseDto {
  id: number;
  name: string;
  last_name: string;
  email: string;
  dni: string;
  commissionId: number | null;
  commission?: Commission | null;
  patients?: Patient[];
}

export const toStudentResponseDto = (
  student: StudentWithRelations,
  options?: { includeCommission?: boolean; includePatients?: boolean },
): StudentResponseDto => {
  const dto: StudentResponseDto = {
    id: student.id,
    name: student.name,
    last_name: student.last_name,
    email: student.email,
    dni: student.dni,
    commissionId: student.commissionId ?? null,
    patients : student.patients
  };

  if (options?.includeCommission && student.commission !== undefined) {
    dto.commission = student.commission;
  }

  if (options?.includePatients && student.patients !== undefined) {
    dto.patients = student.patients;
  }

  return dto;
};
