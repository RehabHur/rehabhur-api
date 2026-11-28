import type { Student } from "../models/student.model.js";
import { commissions } from "./comission.mock.js";

export const students: Student[] = [
  {
    id: 1,
    name: "Lucía",
    last_name: "Fernández",
    email: "lucia.fernandez@unahur.edu.ar",
    dni: "41234567",
    commissionId: 1,
    commission: commissions.find((c) => c.id === 1) ?? null,
    patients: [],
  },
  {
    id: 2,
    name: "Mateo",
    last_name: "Gómez",
    email: "mateo.gomez@unahur.edu.ar",
    dni: "42345678",
    commissionId: 2,
    commission: commissions.find((c) => c.id === 2) ?? null,
    patients: [],
  },
  {
    id: 3,
    name: "Sofía",
    last_name: "Pereyra",
    email: "sofia.pereyra@unahur.edu.ar",
    dni: "43456789",
    commissionId: null,
    commission: null,
    patients: [],
  },
];