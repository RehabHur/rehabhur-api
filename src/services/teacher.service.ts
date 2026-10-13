import { TeacherResponse } from "../repository/dto/teacher-response.dto.js";
import { TeacherRepository } from "../repository/teacher.repository.js";
import { CreateTeacher } from "../repository/dto/teacher-create.dto.js";
import { UpdateTeacher } from "../repository/dto/teacher-update.dto.js";
import { Teacher } from "../models/teacher.model.js";
import { CreateTeacherDto, UpdateTeacherDto } from "../schemas/teacher.schema.js";

export class TeacherService {
  private teacherRepository: TeacherRepository;

  constructor() {
    this.teacherRepository = new TeacherRepository();
  }

  findAll(): Teacher[] {
    return this.teacherRepository.findAll();
  }

  findById(id: number): Teacher | undefined {
    return this.teacherRepository.findById(id);
  }

  create(data: CreateTeacherDto): Teacher {
    return this.teacherRepository.create(data);
  }

  update(id: number, data: UpdateTeacherDto): Teacher | undefined {
    return this.teacherRepository.update(id, data);
  }

  delete(id: number) {
    return this.teacherRepository.delete(id);
  }
}
