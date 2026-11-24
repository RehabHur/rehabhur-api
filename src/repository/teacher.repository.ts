import { Teacher } from "../models/teacher.model.js";
import { teachers } from "../mocks/teacher.mock.js";
import { getPrismaClient } from "../lib/prisma.js";
import {
  CreateTeacherDto,
  UpdateTeacherDto,
  ListTeachersQuery,
} from "../schemas/teacher.schema.js";

export class TeacherRepository {
  async findAll(): Promise<Teacher[]> {
    if (process.env.NODE_ENV === "test") {
      return teachers.map((teacher) => ({ ...teacher }));
    }

    return getPrismaClient().teacher.findMany();
  }



  async findByEmail(email: string): Promise<Teacher | null> {
    if (process.env.NODE_ENV === "test") {
      const teacher = teachers.find((item) => item.email === email);
      return teacher ? { ...teacher } : null;
    }

    return getPrismaClient().teacher.findUnique({
      where: { email },
    });
  }

  async findByDni(dni: string): Promise<Teacher | null> {
    if (process.env.NODE_ENV === "test") {
      const teacher = teachers.find((item) => item.dni === dni);
      return teacher ? { ...teacher } : null;
    }

    return getPrismaClient().teacher.findUnique({
      where: { dni },
    });
  }


  async findById(id: number): Promise<Teacher | null> {
    if (process.env.NODE_ENV === "test") {
      const teacher = teachers.find((item) => item.id === id);
      return teacher ? { ...teacher } : null;
    }

    return getPrismaClient().teacher.findUnique({ where: { id } });
  }

  async create(data: CreateTeacherDto): Promise<Teacher> {
    if (process.env.NODE_ENV === "test") {
      const id = teachers.length ? Math.max(...teachers.map((teacher) => teacher.id)) + 1 : 1;
      const teacher = { id, ...data };
      teachers.push(teacher);
      return { ...teacher };
    }

    return getPrismaClient().teacher.create({ data });
  }

  async update(id: number, data: UpdateTeacherDto): Promise<Teacher> {
    if (process.env.NODE_ENV === "test") {
      const index = teachers.findIndex((teacher) => teacher.id === id);
      if (index === -1) {
        throw new Error("No se encontró el docente de prueba");
      }

      teachers[index] = { ...teachers[index]!, ...data };
      return { ...teachers[index]! };
    }

    return getPrismaClient().teacher.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<Teacher> {
    if (process.env.NODE_ENV === "test") {
      const index = teachers.findIndex((teacher) => teacher.id === id);
      if (index === -1) {
        throw new Error("No se encontró el docente de prueba");
      }

      const [deleted] = teachers.splice(index, 1);
      return { ...deleted! };
    }

    return getPrismaClient().teacher.delete({ where: { id } });
  }
}
