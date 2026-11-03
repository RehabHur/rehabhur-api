import type { ErrorRequestHandler, RequestHandler } from "express";
import { AppError } from "../utils/AppError.js";

export const notFoundHandler: RequestHandler = (req, _res, next): void => {
    next(new AppError(404, "ROUTE_NOT_FOUND", `No existe la ruta ${req.method} ${req.path}`));
};

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next): void => {
    if (err instanceof AppError) {
        res.status(err.statusCode).json({
            success: false,
            error: {
                code: err.code,
                message: err.message,
                ...(err.details !== undefined && { details: err.details }),
            },
        });
        return;
    }

    console.error(err);
    res.status(500).json({
        success: false,
        error: { code: 'INTERNAL_ERROR', message: 'Error interno del servidor' },
    });
};