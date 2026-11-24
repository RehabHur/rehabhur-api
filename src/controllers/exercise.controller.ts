import type { Request, Response } from "express";
import { ExerciseService } from "../services/excercise.service.js"; // Asegúrate de que esta ruta esté bien
import { ExerciseResponseDto, toExerciseResponseDto } from "../dtos/exercise-response.dto.js";
import { listExercisesQuerySchema, type CreateExerciseDto, type UpdateExerciseDto } from "../schemas/exercise.schema.js";
import { parseListQuery } from "../middlewares/validate.js";
import type { PaginatedResponse } from "../utils/pagination.js";

export class ExerciseController {
  constructor(private readonly service: ExerciseService) { }

  findAll = async (req: Request, res: Response<PaginatedResponse<ExerciseResponseDto>>): Promise<void> => {
    const query = parseListQuery(listExercisesQuerySchema, req.query);
    const result = await this.service.findAll(query);
    res.status(200).json({
      data: result.data.map(toExerciseResponseDto),
      meta: result.meta,
    });
  };

  findById = async (req: Request<{ id: string }>, res: Response<ExerciseResponseDto>): Promise<void> => {
    const exercise = await this.service.findById(Number(req.params.id));
    res.status(200).json(toExerciseResponseDto(exercise));
  };

  create = async (req: Request<{}, ExerciseResponseDto, CreateExerciseDto>, res: Response<ExerciseResponseDto>): Promise<void> => {
    const created = await this.service.create(req.body);
    res.status(201).json(toExerciseResponseDto(created));
  };

  update = async (req: Request<{ id: string }, ExerciseResponseDto, UpdateExerciseDto>, res: Response<ExerciseResponseDto>): Promise<void> => {
    const updated = await this.service.update(Number(req.params.id), req.body);
    res.status(200).json(toExerciseResponseDto(updated));
  };

  delete = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    await this.service.delete(Number(req.params.id));
    res.status(204).end();
  };
}