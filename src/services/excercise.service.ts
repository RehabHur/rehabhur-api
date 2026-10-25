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
    // 1. Validar unicidad del linkVideo
    const existingByLink = this.repository.findByLinkVideo(data.linkVideo);
    if (existingByLink) {
      throw new AppError(
        400,
        "DUPLICATE_LINK_VIDEO",
        "Ya existe un ejercicio registrado con este enlace de video"
      );
    }

    // 2. Validar unicidad compuesta de name + bodyRegion
    const existingByNameAndRegion = this.repository.findByNameAndBodyRegion(data.name, data.bodyRegion);
    if (existingByNameAndRegion) {
      throw new AppError(
        400,
        "DUPLICATE_EXERCISE",
        "Ya existe un ejercicio con el mismo nombre para esta región corporal"
      );
    }

    return this.repository.create(data);
  }




  update(id: number, data: UpdateExerciseDto): Exercise {
    // Asegurar que el ejercicio a actualizar exista
    const currentExercise = this.findOrThrow(id);

    // 1. Validar linkVideo si se está enviando y es distinto al actual
    if (data.linkVideo !== undefined && data.linkVideo !== currentExercise.linkVideo) {
      const existingByLink = this.repository.findByLinkVideo(data.linkVideo);
      if (existingByLink && existingByLink.id !== id) {
        throw new AppError(
          400,
          "DUPLICATE_LINK_VIDEO",
          "Ya existe otro ejercicio registrado con este enlace de video"
        );
      }
    }

    // 2. Determinar los valores finales (si no se envían en el DTO, conservamos los actuales)
    const targetName = data.name !== undefined ? data.name : currentExercise.name;
    const targetBodyRegion = data.bodyRegion !== undefined ? data.bodyRegion : currentExercise.bodyRegion;

    // Si cambió el nombre o la región, validamos que la combinación no pertenezca a otro registro
    if (data.name !== undefined || data.bodyRegion !== undefined) {
      const existingByNameAndRegion = this.repository.findByNameAndBodyRegion(targetName, targetBodyRegion);
      if (existingByNameAndRegion && existingByNameAndRegion.id !== id) {
        throw new AppError(
          400,
          "DUPLICATE_EXERCISE",
          "Ya existe otro ejercicio con el mismo nombre para esta región corporal"
        );
      }
    }

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

  private findOrThrow(id: number): Exercise {
    const exercise = this.repository.findById(id);
    if (!exercise) {
      throw new AppError(404, "EXERCISE_NOT_FOUND", "No se encontró el ejercicio");
    }
    return exercise;
  }
}