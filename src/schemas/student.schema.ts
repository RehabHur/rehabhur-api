import { z } from "zod";
import { paginationQuerySchema } from "./pagination.schema.js";

export const createStudentSchema = z.object({
  name: z.string().trim().min(1, "El nombre es obligatorio"),
  last_name: z.string().trim().min(1, "El apellido es obligatorio"),
  email: z.string().trim().email("El correo electrónico no es válido"),
  dni: z.string().trim().min(1, "El DNI es obligatorio"),
  commissionId: z
    .number()
    .int()
    .positive("El ID de la comisión debe ser positivo")
    .nullable()
    .optional(),
  patientIds: z
    .array(z.number().int().positive("El ID del paciente debe ser positivo"))
    .optional(),
});

export const assignPatientsToStudentSchema = z.object({
  patientIds: z
    .array(z.number().int().positive())
    .min(1, "Debe enviar al menos un patientId"),
});

export const updateStudentSchema = createStudentSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "Debes enviar al menos un campo para actualizar",
  });

export const listStudentsQuerySchema = paginationQuerySchema.extend({
  search: z.string().trim().optional(),
});

export type AssignPatientsToStudentDto = z.infer<
  typeof assignPatientsToStudentSchema
>;
export type CreateStudentDto = z.infer<typeof createStudentSchema>;
export type UpdateStudentDto = z.infer<typeof updateStudentSchema>;
export type ListStudentsQuery = z.infer<typeof listStudentsQuerySchema>;
