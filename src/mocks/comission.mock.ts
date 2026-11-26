import type { Commission } from "../models/comission.model.js";
// O si usás directo el cliente de Prisma:
// import type { Commission } from "@prisma/client";

export const commissions: Commission[] = [
  {
    id: 1,
    name: "Comisión 2026 - Mañana",
    year: 2026,
    turno: "Mañana",
    cuatrimestre: 1,
    createdAt: new Date("2026-01-01T08:00:00Z"),
  },
  {
    id: 2,
    name: "Comisión 2026 - Tarde",
    year: 2026,
    turno: "Tarde",
    cuatrimestre: 1,
    createdAt: new Date("2026-01-01T14:00:00Z"),
  },
  {
    id: 3,
    name: "Comisión 2025 - Kinesiología",
    year: 2025,
    turno: "Noche",
    cuatrimestre: 2,
    createdAt: new Date("2025-01-01T08:00:00Z"),
  },
];