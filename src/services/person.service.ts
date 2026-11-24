import { PersonRepository } from "../repository/persons.repository.js";
import type { Person } from "../models/person.model.js";
import type {
  CreatePersonDto,
  ListPersonsQuery,
  UpdatePersonDto,
} from "../schemas/person.schema.js";
import { AppError } from "../utils/AppError.js";
import { paginate, type PaginatedResponse } from "../utils/pagination.js";

export class PersonService {
  constructor(private readonly repository: PersonRepository) {}

  async findAll(
    query: ListPersonsQuery = { page: 1, limit: 10 },
  ): Promise<PaginatedResponse<Person>> {
    const search = query.search?.toLowerCase();

    const persons = await this.repository.findAll();

    const matchesSearch = search
      ? persons.filter((person) =>
          [person.firstName, person.lastName, person.dni, person.email].some(
            (value) => value.toLowerCase().includes(search),
          ),
        )
      : persons;

    const filtered = query.role
      ? matchesSearch.filter((person) => person.role === query.role)
      : matchesSearch;

    return paginate(filtered, query);
  }

  async findById(id: number): Promise<Person> {
    return this.findOrThrow(id);
  }

  async create(data: CreatePersonDto): Promise<Person> {
    const existingByEmail = await this.repository.findByEmail(data.email);
    if (existingByEmail) {
      throw new AppError(
        400,
        "DUPLICATE_EMAIL",
        "Ya existe una persona registrada con este correo electrónico",
      );
    }

    const existingByDni = await this.repository.findByDni(data.dni);
    if (existingByDni) {
      throw new AppError(
        400,
        "DUPLICATE_DNI",
        "Ya existe una persona registrada con este DNI",
      );
    }

    return this.repository.create(data);
  }

  async update(id: number, data: UpdatePersonDto): Promise<Person> {
    const current = await this.findOrThrow(id);

    if (data.email !== undefined && data.email !== current.email) {
      const existingByEmail = await this.repository.findByEmail(data.email);
      if (existingByEmail && existingByEmail.id !== id) {
        throw new AppError(
          400,
          "DUPLICATE_EMAIL",
          "Ya existe otra persona registrada con este correo electrónico",
        );
      }
    }

    if (data.dni !== undefined && data.dni !== current.dni) {
      const existingByDni = await this.repository.findByDni(data.dni);
      if (existingByDni && existingByDni.id !== id) {
        throw new AppError(
          400,
          "DUPLICATE_DNI",
          "Ya existe otra persona registrada con este DNI",
        );
      }
    }

    return this.repository.update(id, data);
  }

  async delete(id: number): Promise<void> {
    await this.findOrThrow(id);
    await this.repository.delete(id);
  }

  private async findOrThrow(id: number): Promise<Person> {
    const person = await this.repository.findById(id);
    if (!person) {
      throw new AppError(404, "PERSON_NOT_FOUND", "No se encontró la persona");
    }
    return person;
  }
}
