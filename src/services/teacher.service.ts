import { TeacherRepository } from "../repository/teacher.repository.js";
import { Teacher } from "../models/teacher.model.js";
import { CreateTeacherDto, UpdateTeacherDto } from "../schemas/teacher.schema.js";
import { AppError } from "../utils/AppError.js";

export class TeacherService {
  constructor(private readonly repository: TeacherRepository) { }

  findAll(): Teacher[] {
    return this.repository.findAll();
  }

  findById(id: number): Teacher {
    return this.findOrThrow(id);
  }

  create(data: CreateTeacherDto): Teacher {
    return this.repository.create(data);
  }

  update(id: number, data: UpdateTeacherDto): Teacher {
    const teacher = this.repository.update(id, data);
    if (!teacher) {
      throw new AppError(404, "TEACHER_NOT_FOUND", "No se encontró el docente");
    }
    return teacher;
  }

  delete(id: number): void {
    const deleted = this.repository.delete(id);
    if (!deleted) {
      throw new AppError(404, "TEACHER_NOT_FOUND", "No se encontró el docente");
    }
  }

  private findOrThrow(id: number): Teacher {
    const teacher = this.repository.findById(id);
    if (!teacher) {
      throw new AppError(404, "TEACHER_NOT_FOUND", "No se encontró el docente");
    }
    return teacher;
  }
}
