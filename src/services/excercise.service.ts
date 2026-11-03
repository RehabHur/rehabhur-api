import { ExerciseRepository } from "../repository/exercises.repository.js";
import { Exercise } from "../models/exercise.model.js";
import { CreateExerciseDto, UpdateExerciseDto } from "../schemas/exercise.schema.js";
import { AppError } from "../utils/AppError.js";


export class ExerciseService {
  constructor(private readonly repository: ExerciseRepository) { }

  findAll(): Exercise[] {
    return this.repository.findAll();
  }

  findById(id: number): Exercise {
    return this.findOrThrow(id);
  }

  create(data: CreateExerciseDto): Exercise {
    this.validateUniqueness(data);
    return this.repository.create(data);
  }

  update(id: number, data: UpdateExerciseDto): Exercise {
    const currentExercise = this.findOrThrow(id);
    this.validateUniqueness({ ...currentExercise, ...data }, id);

    const exercise = this.repository.update(id, data);
    if (!exercise) {
      throw new AppError(404, "EXERCISE_NOT_FOUND", "No se encontró el ejercicio");
    }
    return exercise;
  }

  delete(id: number): void {
    const deleted = this.repository.delete(id);
    if (!deleted) {
      throw new AppError(404, "EXERCISE_NOT_FOUND", "No se encontró el ejercicio");
    }
  }

  private validateUniqueness(
    data: Pick<Exercise, "linkVideo" | "name" | "bodyRegion">,
    excludedId?: number,
  ): void {
    const existingByLink = this.repository.findByLinkVideo(data.linkVideo);
    if (existingByLink && existingByLink.id !== excludedId) {
      throw new AppError(
        409,
        "DUPLICATE_LINK_VIDEO",
        "Ya existe otro ejercicio registrado con este enlace de video",
      );
    }

    const existingByNameAndRegion = this.repository.findByNameAndBodyRegion(data.name, data.bodyRegion);
    if (existingByNameAndRegion && existingByNameAndRegion.id !== excludedId) {
      throw new AppError(
        409,
        "DUPLICATE_EXERCISE",
        "Ya existe otro ejercicio con el mismo nombre para esta región corporal",
      );
    }
  }

  private findOrThrow(id: number): Exercise {
    const exercise = this.repository.findById(id);
    if (!exercise) {
      throw new AppError(404, "EXERCISE_NOT_FOUND", "No se encontró el ejercicio");
    }
    return exercise;
  }
}