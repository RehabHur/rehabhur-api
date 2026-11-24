import type { Person } from "../models/person.model.js";
import { persons } from "../mocks/person.mock.js";
import { getPrismaClient } from "../lib/prisma.js";
import type { CreatePersonDto, UpdatePersonDto } from "../schemas/person.schema.js";

export class PersonRepository {
  async findAll(): Promise<Person[]> {
    if (process.env.NODE_ENV === "test") {
      return persons.map((person) => ({ ...person }));
    }

    return getPrismaClient().person.findMany();
  }

  async findById(id: number): Promise<Person | null> {
    if (process.env.NODE_ENV === "test") {
      const person = persons.find((item) => item.id === id);
      return person ? { ...person } : null;
    }

    return getPrismaClient().person.findUnique({ where: { id } });
  }

  async findByEmail(email: string): Promise<Person | null> {
    if (process.env.NODE_ENV === "test") {
      const person = persons.find((item) => item.email === email);
      return person ? { ...person } : null;
    }

    return getPrismaClient().person.findUnique({ where: { email } });
  }

  async findByDni(dni: string): Promise<Person | null> {
    if (process.env.NODE_ENV === "test") {
      const person = persons.find((item) => item.dni === dni);
      return person ? { ...person } : null;
    }

    return getPrismaClient().person.findUnique({ where: { dni } });
  }

  async create(data: CreatePersonDto): Promise<Person> {
    if (process.env.NODE_ENV === "test") {
      const id = persons.length ? Math.max(...persons.map((person) => person.id)) + 1 : 1;
      const person = { id, ...data };
      persons.push(person);
      return { ...person };
    }

    return getPrismaClient().person.create({ data });
  }

  async update(id: number, data: UpdatePersonDto): Promise<Person> {
    if (process.env.NODE_ENV === "test") {
      const index = persons.findIndex((person) => person.id === id);
      if (index === -1) {
        throw new Error("No se encontró la persona de prueba");
      }

      persons[index] = { ...persons[index]!, ...data };
      return { ...persons[index]! };
    }

    return getPrismaClient().person.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<Person> {
    if (process.env.NODE_ENV === "test") {
      const index = persons.findIndex((person) => person.id === id);
      if (index === -1) {
        throw new Error("No se encontró la persona de prueba");
      }

      const [deleted] = persons.splice(index, 1);
      return { ...deleted! };
    }

    return getPrismaClient().person.delete({ where: { id } });
  }
}
