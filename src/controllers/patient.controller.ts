import type { Request, Response } from "express";

import { toPatientResponseDto, type PatientResponseDto } from "../dtos/patient-response.dto.js";
import { parseListQuery } from "../middlewares/validate.js";
import type {
  CreatePatientDto,
  ListPatientsQuery,
  UpdatePatientDto,
} from "../schemas/patient.schema.js";
import { listPatientsQuerySchema } from "../schemas/patient.schema.js";
import { PatientService } from "../services/patient.service.js";
import type { PaginatedResponse } from "../utils/pagination.js";

export class PatientController {
  constructor(private readonly service: PatientService) {}

  findAll = async (
    req: Request,
    res: Response<PaginatedResponse<PatientResponseDto>>,
  ): Promise<void> => {
    const query: ListPatientsQuery = parseListQuery(listPatientsQuerySchema, req.query);
    const result = await this.service.findAll(query);
    res.status(200).json({
      data: result.data.map(toPatientResponseDto),
      meta: result.meta,
    });
  };

  findById = async (
    req: Request<{ id: string }>,
    res: Response<PatientResponseDto>,
  ): Promise<void> => {
    const patient = await this.service.findById(Number(req.params.id));
    res.status(200).json(toPatientResponseDto(patient));
  };

  create = async (
    req: Request<{}, PatientResponseDto, CreatePatientDto>,
    res: Response<PatientResponseDto>,
  ): Promise<void> => {
    const created = await this.service.create(req.body);
    res.status(201).json(toPatientResponseDto(created));
  };

  update = async (
    req: Request<{ id: string }, PatientResponseDto, UpdatePatientDto>,
    res: Response<PatientResponseDto>,
  ): Promise<void> => {
    const updated = await this.service.update(Number(req.params.id), req.body);
    res.status(200).json(toPatientResponseDto(updated));
  };

  delete = async (
    req: Request<{ id: string }>,
    res: Response,
  ): Promise<void> => {
    await this.service.delete(Number(req.params.id));
    res.status(204).end();
  };
}
