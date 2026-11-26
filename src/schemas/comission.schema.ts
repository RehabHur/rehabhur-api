import { z } from "zod";
import { paginationQuerySchema } from "./pagination.schema.js";

export const createCommissionSchema = z.object({
  name: z.string().trim().min(1, "El nombre es obligatorio"),
  year: z.number().int().min(2000).max(2100),
  turno: z
    .string()
    .trim()
    .toLowerCase()
    .transform((val) => val.charAt(0).toUpperCase() + val.slice(1))
    .pipe(z.enum(["Mañana", "Tarde", "Noche"])),
  cuatrimestre: z.number().int().min(1).max(2),
});

export const updateCommissionSchema = createCommissionSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "Debes enviar al menos un campo para actualizar",
  });

export const listCommissionsQuerySchema = paginationQuerySchema.extend({
  search: z.string().trim().optional(),
});

export type CreateCommissionDto = z.infer<typeof createCommissionSchema>;
export type UpdateCommissionDto = z.infer<typeof updateCommissionSchema>;
export type ListCommissionsQuery = z.infer<typeof listCommissionsQuerySchema>;
