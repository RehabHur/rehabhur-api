import { z } from "zod";
import { paginationQuerySchema } from "./pagination.schema.js";

export const createTeacherSchema = z.object({
  name: z.string().trim().min(1, "El nombre es obligatorio"),
  last_name: z.string().trim().min(1, "El apellido es obligatorio"),
  email: z.string().trim().email("El correo electrónico no es válido"),
  dni: z.string().trim().min(1, "El DNI es obligatorio"),
  commissionIds: z
    .array(z.number().int().positive("El ID de la comisión debe ser positivo"))
    .transform((ids) => [...new Set(ids)])
    .optional(),
});


export const teacherCommissionParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
  commissionId: z.coerce.number().int().positive(),
});

export const updateTeacherSchema = createTeacherSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "Debes enviar al menos un campo para actualizar",
  });

export const listTeachersQuerySchema = paginationQuerySchema.extend({
  search: z.string().trim().optional(),
});

export type CreateTeacherDto = z.infer<typeof createTeacherSchema>;
export type UpdateTeacherDto = z.infer<typeof updateTeacherSchema>;
export type ListTeachersQuery = z.infer<typeof listTeachersQuerySchema>;
