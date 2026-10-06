import { TeacherResponse } from "../repository/dto/teacher-response.dto.js";
import { TeacherRepository } from "../repository/teacher.repository.js";

export class TeacherService {

    private teacherRepository: TeacherRepository;

    constructor() {
        this.teacherRepository = new TeacherRepository();
    }

    getAllTeachers(): TeacherResponse[] {
        return this.teacherRepository.findAll();
    }
}