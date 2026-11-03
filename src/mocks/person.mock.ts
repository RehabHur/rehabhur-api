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

export const persons: Person[] = [...usersAsPersons, ...admins];
