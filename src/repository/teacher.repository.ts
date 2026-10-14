import { Teacher } from "../models/teacher.model.js";
import { teachers } from "../mocks/teacher.mock.js";
import { CreateTeacherDto, UpdateTeacherDto } from "../schemas/teacher.schema.js";

export class TeacherRepository {
  findAll(): Teacher[] {
    return teachers.map((teacher) => ({ ...teacher }));
  }

  findById(id: number): Teacher | undefined {
    const teacher = teachers.find((item) => item.id === id);
    return teacher ? { ...teacher } : undefined;
  }

  create(data: CreateTeacherDto): Teacher {
    const id = teachers.length
      ? Math.max(...teachers.map((teacher) => teacher.id)) + 1
      : 1;

    const teacher: Teacher = {
      id,
      name: data.name,
      last_name: data.last_name,
      email: data.email,
      dni: data.dni,
      commission: data.commission,
    };

    teachers.push(teacher);
    return { ...teacher };
  }

  update(id: number, data: UpdateTeacherDto): Teacher | undefined {
    const index = teachers.findIndex((teacher) => teacher.id === id);
    if (index === -1) return undefined;

    const updated: Teacher = {
      ...teachers[index],
      ...(data.name !== undefined && { name: data.name }),
      ...(data.last_name !== undefined && { last_name: data.last_name }),
      ...(data.email !== undefined && { email: data.email }),
      ...(data.dni !== undefined && { dni: data.dni }),
      ...(data.commission !== undefined && { commission: data.commission }),
    };

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
