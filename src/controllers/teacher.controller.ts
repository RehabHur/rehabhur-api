import { Request, Response } from "express";
import { TeacherService } from "../services/teacher.service.js";
import { TeacherResponse } from "../repository/dto/teacher-response.dto.js";
import { TeacherResponseDto, toTeacherResponseDto } from "../dtos/teacher-response.dto.js";
import { CreateTeacherDto } from "../schemas/teacher.schema.js";

export class TeacherController {

  private readonly service: TeacherService

  constructor() {
    this.service = new TeacherService();
  }

  //Todos
  getAll = async (_req: Request, res: Response): Promise<Response<TeacherResponseDto>> => {

    const teachers = this.service.findAll().map((teacher) => toTeacherResponseDto(teacher));

    return res.status(200).json(teachers);
  };

  getById = async (req: Request<{ id: string }>, res: Response): Promise<Response> => {
    // TypeScript sabe que 'req.params.id' existe y no te deja pedir 'req.params.algoRaro'
    const teacher = this.service.findById(Number(req.params.id));

    return res.status(200).json(teacher);
  };


  create = async (req: Request<{}, {}, CreateTeacherDto>, res: Response): Promise<Response> => {
    const created = this.service.create(req.body);
    return res.status(201).json(created);
  };

  update = async (req: Request, res: Response): Promise<Response> => {

    const id: number = Number(req.params.id);

    const updated = this.service.update(id, req.body);

    return res.status(200).json(updated);
  };

  deleteById = async (req: Request, res: Response): Promise<Response> => {
    const id: number = Number(req.params.id);
    const deleted = this.service.delete(id);
    return res.status(200).json(deleted);
  };
}
