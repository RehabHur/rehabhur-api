import type { Request, Response } from "express";
import { CommissionService } from "../services/comission.service.js";
import { CommissionResponseDto, toCommissionResponseDto } from "../dtos/comission-response.dto.js";
import { listCommissionsQuerySchema, type CreateCommissionDto, type UpdateCommissionDto } from "../schemas/comission.schema.js";
import { parseListQuery } from "../middlewares/validate.js";
import type { PaginatedResponse } from "../utils/pagination.js";

export class CommissionController {
  constructor(private readonly service: CommissionService) { }

  findAll = async (req: Request, res: Response<PaginatedResponse<CommissionResponseDto>>): Promise<void> => {
    const query = parseListQuery(listCommissionsQuerySchema, req.query);
    const result = await this.service.findAll(query);
    res.status(200).json({
      data: result.data.map(toCommissionResponseDto),
      meta: result.meta,
    });
  };

  findById = async (req: Request<{ id: string }>, res: Response<CommissionResponseDto>): Promise<void> => {
    const commission = await this.service.findById(Number(req.params.id));
    res.status(200).json(toCommissionResponseDto(commission));
  };

  create = async (req: Request<{}, CommissionResponseDto, CreateCommissionDto>, res: Response<CommissionResponseDto>): Promise<void> => {
    const created = await this.service.create(req.body);
    res.status(201).json(toCommissionResponseDto(created));
  };

  update = async (req: Request<{ id: string }, CommissionResponseDto, UpdateCommissionDto>, res: Response<CommissionResponseDto>): Promise<void> => {
    const updated = await this.service.update(Number(req.params.id), req.body);
    res.status(200).json(toCommissionResponseDto(updated));
  };

  delete = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    await this.service.delete(Number(req.params.id));
    res.status(204).end();
  };
}