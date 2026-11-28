import type { Request, Response } from "express";
import { StudentService } from "../services/student.service.js";
import {
  type StudentResponseDto,
  toStudentResponseDto,
} from "../dtos/student-response.dto.js";
import {
  listStudentsQuerySchema,
  type AssignPatientsToStudentDto,
  type CreateStudentDto,
  type UpdateStudentDto,
} from "../schemas/student.schema.js";
import { parseListQuery } from "../middlewares/validate.js";
import type { PaginatedResponse } from "../utils/pagination.js";

export class StudentController {
  constructor(private readonly service: StudentService) { }

  findAll = async (
    req: Request,
    res: Response<PaginatedResponse<StudentResponseDto>>,
  ) => {
    const query = parseListQuery(listStudentsQuerySchema, req.query);
    const result = await this.service.findAll(query);

    res.status(200).json({
      data: result.data.map((student) => toStudentResponseDto(student)),
      meta: result.meta,
    });
  };

  findById = async (req: Request<{ id: string }>, res: Response) => {
    const student = await this.service.findById(Number(req.params.id));
    res.status(200).json(toStudentResponseDto(student));
  };

  create = async (
    req: Request<{}, StudentResponseDto, CreateStudentDto>,
    res: Response,
  ) => {
    const created = await this.service.create(req.body);
    res.status(201).json(toStudentResponseDto(created));
  };

  update = async (
    req: Request<{ id: string }, StudentResponseDto, UpdateStudentDto>,
    res: Response,
  ) => {
    const updated = await this.service.update(Number(req.params.id), req.body);
    res.status(200).json(toStudentResponseDto(updated));
  };

  delete = async (req: Request<{ id: string }>, res: Response) => {
    await this.service.delete(Number(req.params.id));
    res.status(204).end();
  };


  addPatients = async (
    req: Request<{ id: string }, StudentResponseDto, AssignPatientsToStudentDto>,
    res: Response,
  ) => {
    const studentId = Number(req.params.id);
    const updated = await this.service.addPatients(studentId, req.body.patientIds);
    res
      .status(200)
      .json(toStudentResponseDto(updated, { includeCommission: true, includePatients: true }));
  };

  removePatients = async (
    req: Request<{ id: string }, StudentResponseDto, AssignPatientsToStudentDto>,
    res: Response<StudentResponseDto>,
  ): Promise<void> => {
    const studentId = Number(req.params.id);
    const updated = await this.service.removePatients(
      studentId,
      req.body.patientIds,
    );
    res
      .status(200)
      .json(
        toStudentResponseDto(updated, {
          includeCommission: true,
          includePatients: true,
        }),
      );
  };
}
