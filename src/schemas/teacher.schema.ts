import { z } from "zod";

export const createTeacherSchema = z.object({
    name: z.string().nonempty({ message: "El nombre es obligatorio" }),
    lastName: z.string().nonempty({ message: "El apellido es obligatorio" }),
    email: z.string().email({ message: "El correo electrónico no es válido" }),
    dni: z.string().nonempty({ message: "El DNI es obligatorio" }),
    comision: z.number().int({ message: "La comisión debe ser un número entero" }).nonnegative({ message: "La comisión no puede ser negativa" }),
});

// Crea un tipo TypeScript a partir del esquema de validación
export type CreateTeacherRequest = z.infer<typeof createTeacherSchema>;

export type UpdateTeacherRequest = z.infer<typeof createTeacherSchema> & { id: string };