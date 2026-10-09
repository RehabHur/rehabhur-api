import { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";

type Buscador<T> = (id: number) => T | undefined;

//validador generico para todas las entidades buscar si existe ono
export const validadorExistencia = <T>(
  buscador: Buscador<T>,
  entidad: string,
) => {
  return (req: Request, res: Response, next: NextFunction): Response | void => {
    const id = Number(req.params.id);
    const instancia = buscador(id);

    if (!instancia) {
      return res.status(404).json({
        message: `El id ${id} no existe en ${entidad}`,
      });
    }

    next();
  };
};

//validar cuando buscamos por id , el id ingresado es numerico
export const validadorIdNumerico = (
  req: Request,
  res: Response,
  next: NextFunction,
): Response | void => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res
      .status(400)
      .json({ message: "El id debe ser un entero positivo" });
  }

  next();
};

//validador de schema
export const validadorSchema = (schema: ZodType) => {
  return (req: Request, res: Response, next: NextFunction): Response | void => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        errores: result.error.issues.map((e) => ({
          atributo: e.path[0],
          error: e.message,
        })),
      });
    }

    next();
  };
};
