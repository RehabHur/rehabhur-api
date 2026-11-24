import { Patient } from "../models/patient.model.js";
import { patients } from "../mocks/patient.mock.js";
import { getPrismaClient } from "../lib/prisma.js";
import { CreatePatientDto, UpdatePatientDto } from "../schemas/patient.schema.js";

export class PatientRepository {
  async findAll(): Promise<Patient[]> {
    if (process.env.NODE_ENV === "test") {
      return patients.map((patient) => ({ ...patient }));
    }

    return getPrismaClient().patient.findMany();
  }

  async findById(id: number): Promise<Patient | null> {
    if (process.env.NODE_ENV === "test") {
      const patient = patients.find((item) => item.id === id);
      return patient ? { ...patient } : null;
    }

    return getPrismaClient().patient.findUnique({ where: { id } });
  }

  async findByEmail(email: string): Promise<Patient | null> {
    if (process.env.NODE_ENV === "test") {
      const patient = patients.find((item) => item.email === email);
      return patient ? { ...patient } : null;
    }

    return getPrismaClient().patient.findUnique({ where: { email } });
  }

  async findByDni(dni: string): Promise<Patient | null> {
    if (process.env.NODE_ENV === "test") {
      const patient = patients.find((item) => item.dni === dni);
      return patient ? { ...patient } : null;
    }

    return getPrismaClient().patient.findUnique({ where: { dni } });
  }

  async create(data: CreatePatientDto): Promise<Patient> {
    if (process.env.NODE_ENV === "test") {
      const id = patients.length ? Math.max(...patients.map((patient) => patient.id)) + 1 : 1;
      const patient = { id, ...data };
      patients.push(patient);
      return { ...patient };
    }

    return getPrismaClient().patient.create({ data });
  }

  async update(id: number, data: UpdatePatientDto): Promise<Patient> {
    if (process.env.NODE_ENV === "test") {
      const index = patients.findIndex((patient) => patient.id === id);
      if (index === -1) {
        throw new Error("No se encontró el paciente de prueba");
      }

      patients[index] = { ...patients[index]!, ...data };
      return { ...patients[index]! };
    }

    return getPrismaClient().patient.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<Patient> {
    if (process.env.NODE_ENV === "test") {
      const index = patients.findIndex((patient) => patient.id === id);
      if (index === -1) {
        throw new Error("No se encontró el paciente de prueba");
      }

      const [deleted] = patients.splice(index, 1);
      return { ...deleted! };
    }

    return getPrismaClient().patient.delete({ where: { id } });
  }
}
