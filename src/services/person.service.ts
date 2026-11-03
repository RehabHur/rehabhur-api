import { PersonRepository } from "../repository/persons.repository.js";
import type { Person } from "../models/person.model.js";
import type { CreatePersonDto, UpdatePersonDto } from "../schemas/person.schema.js";
import { AppError } from "../utils/AppError.js";

export class PersonService {
    constructor(private readonly repository: PersonRepository) { }

    findAll(): Person[] {
        return this.repository.findAll();
    }

    findById(id: number): Person {
        return this.findOrThrow(id);
    }

    create(data: CreatePersonDto): Person {
        const existingByEmail = this.repository.findByEmail(data.email);
        if (existingByEmail) {
            throw new AppError(
                400,
                "DUPLICATE_EMAIL",
                "Ya existe una persona registrada con este correo electrónico"
            );
        }

        const existingByDni = this.repository.findByDni(data.dni);
        if (existingByDni) {
            throw new AppError(
                400,
                "DUPLICATE_DNI",
                "Ya existe una persona registrada con este DNI"
            );
        }

        return this.repository.create(data);
    }

    update(id: number, data: UpdatePersonDto): Person {
        const current = this.findOrThrow(id);

        if (data.email !== undefined && data.email !== current.email) {
            const existingByEmail = this.repository.findByEmail(data.email);
            if (existingByEmail && existingByEmail.id !== id) {
                throw new AppError(
                    400,
                    "DUPLICATE_EMAIL",
                    "Ya existe otra persona registrada con este correo electrónico"
                );
            }
        }

        if (data.dni !== undefined && data.dni !== current.dni) {
            const existingByDni = this.repository.findByDni(data.dni);
            if (existingByDni && existingByDni.id !== id) {
                throw new AppError(
                    400,
                    "DUPLICATE_DNI",
                    "Ya existe otra persona registrada con este DNI"
                );
            }
        }

        const updated = this.repository.update(id, data);
        if (!updated) {
            throw new AppError(404, "PERSON_NOT_FOUND", "No se encontró la persona");
        }
        return updated;
    }

    delete(id: number): void {
        const deleted = this.repository.delete(id);
        if (!deleted) {
            throw new AppError(404, "PERSON_NOT_FOUND", "No se encontró la persona");
        }
    }

    private findOrThrow(id: number): Person {
        const person = this.repository.findById(id);
        if (!person) {
            throw new AppError(404, "PERSON_NOT_FOUND", "No se encontró la persona");
        }
        return person;
    }
}
