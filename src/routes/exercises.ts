import { Router } from "express";

import { ExerciseController } from "../controllers/ExerciseController.js";

// Define las rutas relacionadas con los ejercicios.
const router = Router();

router.get("/", ExerciseController.getExercises);

export default router;