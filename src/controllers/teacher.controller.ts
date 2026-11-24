import type { Request, Response } from "express";
import { TeacherService } from "../services/teacher.service.js";
import {
  TeacherResponseDto,
  toTeacherResponseDto,
} from "../dtos/teacher-response.dto.js";
import {
  listTeachersQuerySchema,
  type CreateTeacherDto,
  type UpdateTeacherDto,
} from "../schemas/teacher.schema.js";
import { parseListQuery } from "../middlewares/validate.js";
import type { PaginatedResponse } from "../utils/pagination.js";

export class TeacherController {
  constructor(private readonly service: TeacherService) {}

  findAll = async (req: Request, res: Response<PaginatedResponse<TeacherResponseDto>>) => {
    const query = parseListQuery(listTeachersQuerySchema, req.query);
    const result = await this.service.findAll(query);
    
    res.status(200).json({
      data: result.data.map(toTeacherResponseDto),
      meta: result.meta,
    });
  };

  findById = async (req: Request<{ id: string }>, res: Response) => {
    const teacher = await this.service.findById(Number(req.params.id));
    res.status(200).json(toTeacherResponseDto(teacher));
  };

  create = async (
    req: Request<{}, TeacherResponseDto, CreateTeacherDto>,
    res: Response,
  ) => {
    const created = await this.service.create(req.body);
    res.status(201).json(toTeacherResponseDto(created));
  };

  update = async (
    req: Request<{ id: string }, TeacherResponseDto, UpdateTeacherDto>,
    res: Response,
  ) => {
    const updated = await this.service.update(Number(req.params.id), req.body);
    res.status(200).json(toTeacherResponseDto(updated));
  };

  delete = async (req: Request<{ id: string }>, res: Response) => {
    await this.service.delete(Number(req.params.id));
    res.status(204).end();
  };
}
