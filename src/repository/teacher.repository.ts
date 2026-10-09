import { Teacher } from "../models/teacher.model.js";
import { teachers } from "../mocks/techer.mock.js";
import { CreateTeacher } from "../repository/dto/teacher-create.dto.js";
import { UpdateTeacher } from "../repository/dto/teacher-update.dto.js";
import { da } from "zod/locales";

export class TeacherRepository {
  findAll(): Teacher[] {
    return teachers;
  }

  getTeacherById(id: number): Teacher | undefined {
    return teachers.find((t) => t.id === id);
  }

  createTeacher(data: CreateTeacher): Teacher {
    const newId = teachers.length
      ? Math.max(...teachers.map((t) => t.id)) + 1
      : 1;
    const newTeacher: Teacher = {
      id: newId,
      name: data.name,
      lastName: data.lastName,
      email: data.email,
      dni: data.dni,
      comision: data.comision,
    };
    teachers.push(newTeacher);
    return newTeacher;
  }

  updateTeacher(idx: number, data: UpdateTeacher): Teacher {
    const index = teachers.findIndex((t) => t.id === idx);

    const updated: Teacher = {
      id: idx,
      name: data.name,
      lastName: data.lastName,
      email: data.email,
      dni: data.dni,
      comision: data.comision,
    };

    teachers[index] = updated;
    return updated;
  }

  deleteTeacherById(id: number): Teacher | undefined {
  const index = teachers.findIndex((t) => t.id === id);
  const [eliminado] = teachers.splice(index, 1);
  return eliminado;
}
}
