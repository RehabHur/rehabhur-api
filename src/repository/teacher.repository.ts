import { Teacher } from "../models/teacher.model.js";
import { teachers } from "../mocks/techer.mock.js";
import { UpdateTeacher } from "../repository/dto/teacher-update.dto.js";
import { CreateTeacherDto, UpdateTeacherDto } from "../schemas/teacher.schema.js";

export class TeacherRepository {
  findAll(): Teacher[] {
    return teachers;
  }

  findById(id: number): Teacher | undefined {
    return teachers.find((t) => t.id === id);
  }

  create(data: CreateTeacherDto): Teacher {
    const id = teachers.length
      ? Math.max(...teachers.map((t) => t.id)) + 1
      : 1;

    const teacher: Teacher = {
      id,
      ...data
    };

    teachers.push(teacher);
    return teacher;
  }

  update(id: number, data: UpdateTeacherDto): Teacher | undefined {
    const index = teachers.findIndex((teacher) => teacher.id === id);
    if (index === -1) return undefined;


    const updated = { ...teachers[index], ...data };

    teachers[index] = updated;

    return { ...updated };
  }

  delete(id: number): Teacher | undefined {
    const index = teachers.findIndex((teacher) => teacher.id === id);
    if (index === -1) return undefined;

    const [deleted] = teachers.splice(index, 1);
    return deleted ? { ...deleted } : undefined;
  }
}
