import { z } from "zod";

export const createTeacherSchema = z.object({
    name: z.string().trim().min(1, "El nombre es obligatorio"),
    lastName: z.string().trim().min(1, "El apellido es obligatorio"),
    email: z.string().trim().email("El correo electrónico no es válido"),
    dni: z.string().trim().min(1, "El DNI es obligatorio"),
    comision: z.number().int().nonnegative(),
});

export const updateTeacherSchema = createTeacherSchema
    .partial()
    .refine((data) => Object.keys(data).length > 0, {
        message: "Debes enviar al menos un campo para actualizar",
    });

export type CreateTeacherDto = z.infer<typeof createTeacherSchema>;
export type UpdateTeacherDto = z.infer<typeof updateTeacherSchema>;