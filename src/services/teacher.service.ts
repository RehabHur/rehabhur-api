import { TeacherRepository } from "../repository/teacher.repository.js";
import { Teacher } from "../models/teacher.model.js";
import {
  CreateTeacherDto,
  ListTeachersQuery,
  UpdateTeacherDto,
} from "../schemas/teacher.schema.js";
import { AppError } from "../utils/AppError.js";
import { paginate, type PaginatedResponse } from "../utils/pagination.js";

export class TeacherService {
  constructor(private readonly repository: TeacherRepository) {}

  async findAll(
    query: ListTeachersQuery = { page: 1, limit: 10 },
  ): Promise<PaginatedResponse<Teacher>> {
    const search = query.search?.toLowerCase();

    const teachers = await this.repository.findAll();

    const matchesSearch = search
      ? teachers.filter((teacher) =>
          [teacher.name, teacher.last_name, teacher.email, teacher.dni].some(
            (value) => value.toLowerCase().includes(search),
          ),
        )
      : teachers;

    return paginate(matchesSearch, query);
  }

  async findById(id: number): Promise<Teacher> {
    const teacher = await this.repository.findById(id);
    if (!teacher) {
      throw new AppError(404, "TEACHER_NOT_FOUND", "No se encontró el docente");
    }
    return teacher;
  }

  async create(data: CreateTeacherDto): Promise<Teacher> {
    const existingByEmail = await this.repository.findByEmail(data.email);
    if (existingByEmail) {
      throw new AppError(
        400,
        "DUPLICATE_EMAIL",
        "Ya existe un docente registrado con este correo electrónico",
      );
    }

    const existingByDni = await this.repository.findByDni(data.dni);
    if (existingByDni) {
      throw new AppError(
        400,
        "DUPLICATE_DNI",
        "Ya existe un docente registrado con este DNI",
      );
    }

    return this.repository.create(data);
  }

  async update(id: number, data: UpdateTeacherDto): Promise<Teacher> {
    const current = await this.findById(id);
    if (data.email !== undefined && data.email !== current.email) {
      const existingByEmail = await this.repository.findByEmail(data.email);
      if (existingByEmail && existingByEmail.id !== id) {
        throw new AppError(
          400,
          "DUPLICATE_EMAIL",
          "Ya existe otro docente registrado con este correo electrónico",
        );
      }
    }

    if (data.dni !== undefined && data.dni !== current.dni) {
      const existingByDni = await this.repository.findByDni(data.dni);
      if (existingByDni && existingByDni.id !== id) {
        throw new AppError(
          400,
          "DUPLICATE_DNI",
          "Ya existe otro docente registrado con este DNI",
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
