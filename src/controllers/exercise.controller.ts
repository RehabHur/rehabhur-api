import type { Request, Response } from "express";
import { ExerciseService } from "../services/excercise.service.js";
import { ExerciseResponseDto, toExerciseResponseDto } from "../dtos/exercise-response.dto.js";
import type { CreateExerciseDto, UpdateExerciseDto } from "../schemas/exercise.schema.js";

export class ExerciseController {
  constructor(private readonly service: ExerciseService) {}

  findAll = (_req: Request, res: Response<ExerciseResponseDto[]>): void => {
    const exercises = this.service.findAll().map(toExerciseResponseDto);
    res.status(200).json(exercises);
  };

  findById = (req: Request<{ id: string }>, res: Response<ExerciseResponseDto>): void => {
    const exercise = this.service.findById(Number(req.params.id));
    res.status(200).json(toExerciseResponseDto(exercise));
  };

  create = (req: Request<{}, ExerciseResponseDto, CreateExerciseDto>, res: Response<ExerciseResponseDto>): void => {
    const created = this.service.create(req.body);
    res.status(201).json(toExerciseResponseDto(created));
  };

  update = (req: Request<{ id: string }, ExerciseResponseDto, UpdateExerciseDto>, res: Response<ExerciseResponseDto>): void => {
    const updated = this.service.update(Number(req.params.id), req.body);
    res.status(200).json(toExerciseResponseDto(updated));
  };

  delete = (req: Request<{ id: string }>, res: Response): void => {
    this.service.delete(Number(req.params.id));
    res.status(204).end();
  };
}