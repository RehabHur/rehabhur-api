import type { Student } from "../models/student.model.js";
import { students } from "../mocks/student.mock.js";
import { patients } from "../mocks/patient.mock.js";
import { commissions } from "../mocks/comission.mock.js";
import { getPrismaClient } from "../lib/prisma.js";
import type {
  CreateStudentDto,
  UpdateStudentDto,
} from "../schemas/student.schema.js";

export class StudentRepository {
  async findAll(): Promise<Student[]> {
    if (process.env.NODE_ENV === "test") {
      return students.map(({ commission, patients: _patients, ...student }) => ({
        ...student,
        commissionId: student.commissionId ?? null,
      }));
    }

    return getPrismaClient().student.findMany();
  }

  async findByEmail(email: string): Promise<Student | null> {
    if (process.env.NODE_ENV === "test") {
      const student = students.find((item) => item.email === email);
      return student ? { ...student } : null;
    }

    return getPrismaClient().student.findUnique({
      where: { email },
    });
  }

  async findByDni(dni: string): Promise<Student | null> {
    if (process.env.NODE_ENV === "test") {
      const student = students.find((item) => item.dni === dni);
      return student ? { ...student } : null;
    }

    return getPrismaClient().student.findUnique({
      where: { dni },
    });
  }

  async findById(id: number): Promise<Student | null> {
    if (process.env.NODE_ENV === "test") {
      const student = students.find((item) => item.id === id);
      if (!student) return null;

      const resolvedCommission =
        student.commissionId != null
          ? (commissions.find((c) => c.id === student.commissionId) ?? null)
          : (student.commission ?? null);

      const resolvedPatients = (student.patients ?? []).map((p) => ({ ...p }));

      return {
        ...student,
        commissionId: student.commissionId ?? null,
        commission: resolvedCommission ? { ...resolvedCommission } : null,
        patients: resolvedPatients,
      };
    }

    return getPrismaClient().student.findUnique({
      where: { id },
      include: {
        commission: true,
        patients: true,
      },
    });
  }

  async create(data: CreateStudentDto): Promise<Student> {
    const commissionId = data.commissionId ?? null;

    if (process.env.NODE_ENV === "test") {
      const id = students.length
        ? Math.max(...students.map((student) => student.id)) + 1
        : 1;

      const resolvedCommission =
        commissionId !== null
          ? (commissions.find((c) => c.id === commissionId) ?? null)
          : null;

      const student: Student = {
        id,
        name: data.name,
        last_name: data.last_name,
        email: data.email,
        dni: data.dni,
        commissionId,
        commission: resolvedCommission ? { ...resolvedCommission } : null,
        patients: [],
      };

      students.push(student);
      return {
        ...student,
        commission: student.commission ? { ...student.commission } : null,
        patients: [],
      };
    }

    return getPrismaClient().student.create({
      data: {
        name: data.name,
        last_name: data.last_name,
        email: data.email,
        dni: data.dni,
        ...(commissionId !== null && {
          commission: { connect: { id: commissionId } },
        }),
      },
      include: {
        commission: true,
        patients: true,
      },
    });
  }

  async update(id: number, data: UpdateStudentDto): Promise<Student> {
    if (process.env.NODE_ENV === "test") {
      const index = students.findIndex((student) => student.id === id);
      if (index === -1) {
        throw new Error("No se encontró el estudiante de prueba");
      }

      const current = students[index]!;
      const nextCommissionId =
        data.commissionId !== undefined
          ? data.commissionId
          : (current.commissionId ?? null);

      const resolvedCommission =
        nextCommissionId !== null
          ? (commissions.find((c) => c.id === nextCommissionId) ?? null)
          : null;

      students[index] = {
        ...current,
        ...data,
        commissionId: nextCommissionId,
        commission: resolvedCommission ? { ...resolvedCommission } : null,
        patients: (current.patients ?? []).map((p) => ({ ...p })),
      };

      return {
        ...students[index]!,
        commission: students[index]!.commission
          ? { ...students[index]!.commission! }
          : null,
        patients: (students[index]!.patients ?? []).map((p) => ({ ...p })),
      };
    }

    const { commissionId, ...studentData } = data;

    return getPrismaClient().student.update({
      where: { id },
      data: {
        ...studentData,
        ...(commissionId !== undefined && {
          commission:
            commissionId === null
              ? { disconnect: true }
              : { connect: { id: commissionId } },
        }),
      },
      include: {
        commission: true,
        patients: true,
      },
    });
  }

  async addPatients(studentId: number, patientIds: number[]): Promise<Student> {
    if (process.env.NODE_ENV === "test") {
      const index = students.findIndex((student) => student.id === studentId);
      if (index === -1) {
        throw new Error("No se encontró el estudiante de prueba");
      }

      const current = students[index]!;
      const existingPatients = current.patients ?? [];
      const existingIds = new Set(existingPatients.map((p) => p.id));

      for (const patientId of patientIds) {
        if (!existingIds.has(patientId)) {
          const foundPatient = patients.find((p) => p.id === patientId);
          if (foundPatient) {
            existingPatients.push({ ...foundPatient });
            existingIds.add(patientId);
          }
        }
      }

      students[index] = {
        ...current,
        patients: existingPatients,
      };

      return {
        ...students[index]!,
        patients: students[index]!.patients!.map((p) => ({ ...p })),
      };
    }

    return getPrismaClient().student.update({
      where: { id: studentId },
      data: {
        patients: {
          connect: patientIds.map((id) => ({ id })),
        },
      },
      include: {
        commission: true,
        patients: true,
      },
    });
  }

  async removePatient(studentId: number, patientId: number): Promise<Student> {
    if (process.env.NODE_ENV === "test") {
      const index = students.findIndex((student) => student.id === studentId);
      if (index === -1) {
        throw new Error("No se encontró el estudiante de prueba");
      }

      const current = students[index]!;
      const nextPatients = (current.patients ?? []).filter(
        (p) => p.id !== patientId,
      );

      students[index] = {
        ...current,
        patients: nextPatients,
      };

      return {
        ...students[index]!,
        patients: students[index]!.patients!.map((p) => ({ ...p })),
      };
    }

    return getPrismaClient().student.update({
      where: { id: studentId },
      data: {
        patients: {
          disconnect: { id: patientId },
        },
      },
      include: {
        commission: true,
        patients: true,
      },
    });
  }

  async delete(id: number): Promise<Student> {
    if (process.env.NODE_ENV === "test") {
      const index = students.findIndex((student) => student.id === id);
      if (index === -1) {
        throw new Error("No se encontró el estudiante de prueba");
      }

      const [deleted] = students.splice(index, 1);
      return { ...deleted! };
    }

    return getPrismaClient().student.delete({ where: { id } });
  }
}
