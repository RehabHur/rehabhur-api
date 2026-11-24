import { PatientRepository } from "../repository/patients.repository.js";
import { Patient } from "../models/patient.model.js";
import {
  CreatePatientDto,
  ListPatientsQuery,
  UpdatePatientDto,
} from "../schemas/patient.schema.js";
import { AppError } from "../utils/AppError.js";
import { paginate, type PaginatedResponse } from "../utils/pagination.js";

export class PatientService {
  constructor(private readonly repository: PatientRepository) {}

  async findAll(query: ListPatientsQuery = { page: 1, limit: 10 }): Promise<PaginatedResponse<Patient>> {
    const search = query.search?.toLowerCase();
    
    const patients = await this.repository.findAll();

    const matchesSearch = search
      ? patients.filter((patient) =>
          [patient.name, patient.last_name, patient.email, patient.dni]
            .some((value) => value.toLowerCase().includes(search)))
      : patients;

    return paginate(matchesSearch, query);
  }

  async findById(id: number): Promise<Patient> {
    const patient = await this.repository.findById(id);
    if (!patient) {
      throw new AppError(
        404,
        "PATIENT_NOT_FOUND",
        "No se encontró el paciente",
      );
    }
    return patient;
  }

  async create(data: CreatePatientDto): Promise<Patient> {
    const existingByEmail = await this.repository.findByEmail(data.email);
    if (existingByEmail) {
      throw new AppError(
        400,
        "DUPLICATE_EMAIL",
        "Ya existe un paciente registrado con este correo electrónico",
      );
    }

    const existingByDni = await this.repository.findByDni(data.dni);
    if (existingByDni) {
      throw new AppError(
        400,
        "DUPLICATE_DNI",
        "Ya existe un paciente registrado con este DNI",
      );
    }

    return this.repository.create(data);
  }

  async update(id: number, data: UpdatePatientDto): Promise<Patient> {
    const current = await this.findById(id);

    if (data.email !== undefined && data.email !== current.email) {
      const existingByEmail = await this.repository.findByEmail(data.email);
      if (existingByEmail && existingByEmail.id !== id) {
        throw new AppError(
          400,
          "DUPLICATE_EMAIL",
          "Ya existe otro paciente registrado con este correo electrónico",
        );
      }
    }

    if (data.dni !== undefined && data.dni !== current.dni) {
      const existingByDni = await this.repository.findByDni(data.dni);
      if (existingByDni && existingByDni.id !== id) {
        throw new AppError(
          400,
          "DUPLICATE_DNI",
          "Ya existe otro paciente registrado con este DNI",
        );
      }
    }

    return this.repository.update(id, data);
  }

  async delete(id: number): Promise<void> {
    await this.findById(id);
    await this.repository.delete(id);
  }
}
