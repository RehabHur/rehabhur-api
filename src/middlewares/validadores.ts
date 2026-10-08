import { Request, Response, NextFunction } from "express";

type Buscador<T> = (id: number) => T | undefined;

export const validadorExistencia = <T>(buscador: Buscador<T>, entidad: string) => {
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

export const validadorIdNumerico = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ message: "El id debe ser un entero positivo" });
  }

  next();
};

