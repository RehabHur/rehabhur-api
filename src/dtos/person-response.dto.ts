import type { Person, PersonRole } from "../models/person.model.js";

export interface PersonResponseDto {
    id: number;
    firstName: string;
    lastName: string;
    dni: string;
    email: string;
    nationality: string;
    role: PersonRole;
}

export function toPersonResponseDto(person: Person): PersonResponseDto {
    return {
        id: person.id,
        firstName: person.firstName,
        lastName: person.lastName,
        dni: person.dni,
        email: person.email,
        nationality: person.nationality,
        role: person.role,
    };
}
