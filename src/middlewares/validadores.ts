import type { Request, Response, NextFunction } from "express";
import type { ZodType } from "zod";

export const schemaValidator = (schema: ZodType) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({
        errores: result.error.issues.map((issue) => ({
          attribute: issue.path.join("."),
          error: issue.message,
        })),
      });
      return;
    }

    req.body = result.data;
    next();
  };
};