import { z } from "zod";

export const createExerciseSchema = z.object({
    name: z.string().trim().min(1, "El nombre del ejercicio es obligatorio"),
    bodyRegion: z.string().trim().min(1, "La región corporal es obligatoria"),
    motionType: z.string().trim().min(1, "El tipo de movimiento es obligatorio"),
    material: z.string().trim().min(1, "El material es obligatorio"),
    linkVideo: z.string().trim().url("El enlace del video debe ser una URL válida"),
    instructions: z.string().trim().min(1, "Las instrucciones son obligatorias"),
});

export const updateExerciseSchema = createExerciseSchema
    .partial()
    .refine((data) => Object.keys(data).length > 0, {
        message: "Debes enviar al menos un campo para actualizar",
    });

export type CreateExerciseDto = z.infer<typeof createExerciseSchema>;
export type UpdateExerciseDto = z.infer<typeof updateExerciseSchema>;