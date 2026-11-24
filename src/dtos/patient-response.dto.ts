import type { Patient } from "../models/patient.model.js";

export interface PatientResponseDto {
  id: number;
  name: string;
  last_name: string;
  email: string;
  dni: string;
  commission: number;
}

export function toPatientResponseDto(patient: Patient): PatientResponseDto {
  return {
    id: patient.id,
    name: patient.name,
    last_name: patient.last_name,
    email: patient.email,
    dni: patient.dni,
    commission: patient.commission,
  };
}