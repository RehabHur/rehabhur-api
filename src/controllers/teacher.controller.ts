import type { Request, Response } from "express";
import { TeacherService } from "../services/teacher.service.js";
import { TeacherResponseDto, toTeacherResponseDto } from "../dtos/teacher-response.dto.js";
import type { CreateTeacherDto, UpdateTeacherDto } from "../schemas/teacher.schema.js";

export class TeacherController {
  constructor(private readonly service: TeacherService) {}

  findAll = (_req: Request, res: Response<TeacherResponseDto[]>): void => {
    const teachers = this.service.findAll().map(toTeacherResponseDto);
    res.status(200).json(teachers);
  };

  findById = (req: Request<{ id: string }>, res: Response<TeacherResponseDto>): void => {
    const teacher = this.service.findById(Number(req.params.id));
    res.status(200).json(toTeacherResponseDto(teacher));
  };

  create = (req: Request<{}, TeacherResponseDto, CreateTeacherDto>, res: Response<TeacherResponseDto>): void => {
    const created = this.service.create(req.body);
    res.status(201).json(toTeacherResponseDto(created));
  };

  update = (req: Request<{ id: string }, TeacherResponseDto, UpdateTeacherDto>, res: Response<TeacherResponseDto>): void => {
    const updated = this.service.update(Number(req.params.id), req.body);
    res.status(200).json(toTeacherResponseDto(updated));
  };

  delete = (req: Request<{ id: string }>, res: Response): void => {
    this.service.delete(Number(req.params.id));
    res.status(204).end();
  };
}
