import type { Person, PersonRole } from "../models/person.model.js";
import { users } from "./user.mock.js";

const usersAsPersons: Person[] = users.map((user, index) => ({
    id: index + 1,
    firstName: user.name,
    lastName: user.lastName,
    dni: user.dni.replaceAll(".", ""),
    email: user.email,
    nationality: "Argentina",
    role: user.profile as PersonRole,
}));

const admins: Person[] = [
    {
        id: usersAsPersons.length + 1,
        firstName: "Usuario",
        lastName: "Administrador",
        dni: "30111222",
        email: "admin@rehabhur.com",
        nationality: "Argentina",
        role: "admin",
    },
    {
        id: usersAsPersons.length + 2,
        firstName: "Coordinación",
        lastName: "Académica",
        dni: "28333444",
        email: "coordinacion@rehabhur.com",
        nationality: "Argentina",
        role: "admin",
    },
];

const firstNames = [
    "Agustina", "Alejandro", "Ana", "Bruno", "Camila", "Carolina", "Daniel",
    "Elena", "Facundo", "Florencia", "Gabriel", "Julieta", "Lautaro", "Lucía",
    "Marcos", "Martina", "Mateo", "Natalia", "Nicolás", "Valentina",
];

const lastNames = [
    "Acosta", "Álvarez", "Benítez", "Cabrera", "Castro", "Correa", "Duarte",
    "Fernández", "Gómez", "Herrera", "Ibarra", "López", "Méndez", "Molina",
    "Navarro", "Pereyra", "Ramírez", "Rojas", "Sosa", "Torres",
];

const targetCounts: Record<"admin" | "estudiante" | "paciente", number> = {
    admin: 20,
    estudiante: 800,
    paciente: 200,
};

const seedPersons = [...usersAsPersons, ...admins];
const generatedPersons: Person[] = [];

let nextId = seedPersons.length + 1;
let nextDni = 50_000_000;

for (const role of ["estudiante", "admin", "paciente"] as const) {
    const existing = seedPersons.filter((person) => person.role === role).length;
    const missing = targetCounts[role] - existing;

    for (let index = 1; index <= missing; index += 1) {
        const position = generatedPersons.length;

        generatedPersons.push({
            id: nextId,
            firstName: firstNames[position % firstNames.length]!,
            lastName: lastNames[(position * 3) % lastNames.length]!,
            dni: String(nextDni),
            email: `${role}${index}@rehabhur.com`,
            nationality: "Argentina",
            role,
        });

        nextId += 1;
        nextDni += 1;
    }
}

export const persons: Person[] = [...seedPersons, ...generatedPersons];
