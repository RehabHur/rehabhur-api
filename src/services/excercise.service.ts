import { exercises } from "../mocks/exercise.mock.js";
import type { Exercise } from "../models/exercise.model.js";

// Maneja la lógica relacionada con los ejercicios.
export class ExerciseService {
    private readonly exercisesList: Exercise[] = exercises;

    async getExercises(): Promise<Exercise[]> {
        return this.exercisesList;
    }
}