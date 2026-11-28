import type { Student } from "./student.model.js";

export interface Patient {
  id: number;
  name: string;
  last_name: string;
  email: string;
  dni: string;
  students?: Student[];
}