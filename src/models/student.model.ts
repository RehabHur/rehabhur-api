import type { Commission } from "./comission.model.js";
import type { Patient } from "./patient.model.js";

export interface Student {
  id: number;
  name: string;
  last_name: string;
  email: string;
  dni: string;
  commissionId?: number | null;
  commission?: Commission | null;
  patients?: Patient[];
}