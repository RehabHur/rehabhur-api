import { TeacherResponse } from "../repository/dto/teacher-response.dto.js";
import { TeacherRepository } from "../repository/teacher.repository.js";
import { CreateTeacher } from "../repository/dto/teacher-create.dto.js";
import { UpdateTeacher } from "../repository/dto/teacher-update.dto.js";

export class TeacherService {
  private teacherRepository: TeacherRepository;

  constructor() {
    this.teacherRepository = new TeacherRepository();
  }

  getAllTeachers(): TeacherResponse[] {
    return this.teacherRepository.findAll();
  }

  getTeacherById(id: number): TeacherResponse | undefined {
    return this.teacherRepository.getTeacherById(id);
  }

  createTeacher(data: CreateTeacher): TeacherResponse {
    return this.teacherRepository.createTeacher(data);
  }

  updateTeacher(id: number, data: UpdateTeacher): TeacherResponse {
    return this.teacherRepository.updateTeacher(id, data);
  }

  deleteTeacherById(id: number) {
    return this.teacherRepository.deleteTeacherById(id);
  }
}
