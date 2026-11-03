export const personRoles = ["admin", "docente", "estudiante", "paciente"] as const;

export type PersonRole = (typeof personRoles)[number];

export interface Person {
    id: number;
    firstName: string;
    lastName: string;
    dni: string;
    email: string;
    nationality: string;
    role: PersonRole;
}
