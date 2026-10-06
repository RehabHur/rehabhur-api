import type { Request, Response } from "express";

import { ExerciseService } from "../services/ExerciseService.js";

// Inyección de dependencias.
const exerciseService = new ExerciseService();

// Maneja las solicitudes relacionadas con los ejercicios.
export class ExerciseController {
    static async getExercises(req: Request, res: Response): Promise<void> {
        try {
            const exercises = await exerciseService.getExercises();
            res.status(200).json(exercises);
        } catch (error) {
            console.error("Error al obtener los ejercicios:", error);
            res.status(500).json({ error: "Error al obtener los ejercicios" });
        }
    }
}