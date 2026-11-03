import type { Person } from "../models/person.model.js";
import { persons } from "../mocks/person.mock.js";
import type { CreatePersonDto, UpdatePersonDto } from "../schemas/person.schema.js";

export class PersonRepository {
    findAll(): Person[] {
        return persons.map((person) => ({ ...person }));
    }

    findById(id: number): Person | undefined {
        const person = persons.find((item) => item.id === id);
        return person ? { ...person } : undefined;
    }

    findByEmail(email: string): Person | undefined {
        const person = persons.find((item) => item.email === email);
        return person ? { ...person } : undefined;
    }

    findByDni(dni: string): Person | undefined {
        const person = persons.find((item) => item.dni === dni);
        return person ? { ...person } : undefined;
    }

    create(data: CreatePersonDto): Person {
        const id = persons.length
            ? Math.max(...persons.map((person) => person.id)) + 1
            : 1;

        const person: Person = { id, ...data };
        persons.push(person);
        return { ...person };
    }

    update(id: number, data: UpdatePersonDto): Person | undefined {
        const index = persons.findIndex((person) => person.id === id);
        if (index === -1) return undefined;

        const current = persons[index]!;
        const updated: Person = { ...current, ...data };

        persons[index] = updated;
        return { ...updated };
    }

    delete(id: number): Person | undefined {
        const index = persons.findIndex((person) => person.id === id);
        if (index === -1) return undefined;

        const [deleted] = persons.splice(index, 1);
        return deleted ? { ...deleted } : undefined;
    }
}
