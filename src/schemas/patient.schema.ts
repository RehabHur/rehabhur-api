import { z } from "zod";

import { paginationQuerySchema } from "./pagination.schema.js";

export const createPatientSchema = z.object({
    name: z.string().trim().min(1, "El nombre es obligatorio"),
    last_name: z.string().trim().min(1, "El apellido es obligatorio"),
    email: z.string().trim().toLowerCase().email("El correo electrónico no es válido"),
    dni: z
        .string()
        .trim()
        .regex(/^\d{7,8}$/, "El DNI debe contener entre 7 y 8 dígitos"),
    commission: z.number().int().nonnegative("La comisión debe ser un entero no negativo"),
});

export const updatePatientSchema = createPatientSchema
    .partial()
    .refine((data) => Object.keys(data).length > 0, {
        message: "Debes enviar al menos un campo para actualizar",
    });

export const listPatientsQuerySchema = paginationQuerySchema.extend({
    search: z.string().trim().optional(),
});

export type CreatePatientDto = z.infer<typeof createPatientSchema>;
export type UpdatePatientDto = z.infer<typeof updatePatientSchema>;
export type ListPatientsQuery = z.infer<typeof listPatientsQuerySchema>;
