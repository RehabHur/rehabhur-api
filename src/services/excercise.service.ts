import { ExerciseRepository } from "../repository/exercises.repository.js";
import { Exercise } from "../models/exercise.model.js";
import { CreateExerciseDto, ListExercisesQuery, UpdateExerciseDto } from "../schemas/exercise.schema.js";
import { AppError } from "../utils/AppError.js";
import { paginate, type PaginatedResponse } from "../utils/pagination.js";

export class ExerciseService {
  constructor(private readonly repository: ExerciseRepository) { }

  async findAll(query: ListExercisesQuery = { page: 1, limit: 10 }): Promise<PaginatedResponse<Exercise>> {
    const search = query.search?.toLowerCase();
    
    // 1. Traemos todo de la DB
    const exercises = await this.repository.findAll();
    
    // 2. Filtramos en memoria
    const filtered = search
      ? exercises.filter((exercise) =>
        [exercise.name, exercise.bodyRegion, exercise.motionType, exercise.material]
          .some((value) => value.toLowerCase().includes(search)))
      : exercises;

    // 3. Paginamos
    return paginate(filtered, query);
  }

  async findById(id: number): Promise<Exercise> {
    return this.findOrThrow(id);
  }

  async create(data: CreateExerciseDto): Promise<Exercise> {
    await this.validateUniqueness(data);
    return this.repository.create(data);
  }

  async update(id: number, data: UpdateExerciseDto): Promise<Exercise> {
    const currentExercise = await this.findOrThrow(id);
    await this.validateUniqueness({ ...currentExercise, ...data }, id);

    return this.repository.update(id, data);
  }

  async delete(id: number): Promise<void> {
    await this.findOrThrow(id);
    await this.repository.delete(id);
  }

  private async validateUniqueness(
    data: Pick<Exercise, "linkVideo" | "name" | "bodyRegion">,
    excludedId?: number,
  ): Promise<void> {
    const existingByLink = await this.repository.findByLinkVideo(data.linkVideo);
    if (existingByLink && existingByLink.id !== excludedId) {
      throw new AppError(
        409,
        "DUPLICATE_LINK_VIDEO",
        "Ya existe otro ejercicio registrado con este enlace de video",
      );
    }

    const existingByNameAndRegion = await this.repository.findByNameAndBodyRegion(data.name, data.bodyRegion);
    if (existingByNameAndRegion && existingByNameAndRegion.id !== excludedId) {
      throw new AppError(
        409,
        "DUPLICATE_EXERCISE",
        "Ya existe otro ejercicio con el mismo nombre para esta región corporal",
      );
    }
  }

  private async findOrThrow(id: number): Promise<Exercise> {
    const exercise = await this.repository.findById(id);
    if (!exercise) {
      throw new AppError(404, "EXERCISE_NOT_FOUND", "No se encontró el ejercicio");
    }
    return exercise;
  }
}