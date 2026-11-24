import type { Request, Response } from "express";
import { PersonService } from "../services/person.service.js";
import { PersonResponseDto, toPersonResponseDto } from "../dtos/person-response.dto.js";
import { listPersonsQuerySchema, type CreatePersonDto, type UpdatePersonDto } from "../schemas/person.schema.js";
import { parseListQuery } from "../middlewares/validate.js";
import type { PaginatedResponse } from "../utils/pagination.js";

export class PersonController {
  constructor(private readonly service: PersonService) {}

  findAll = async (req: Request, res: Response<PaginatedResponse<PersonResponseDto>>): Promise<void> => {
    const query = parseListQuery(listPersonsQuerySchema, req.query);
    const result = await this.service.findAll(query);
    res.status(200).json({
      data: result.data.map(toPersonResponseDto),
      meta: result.meta,
    });
  };

  findById = async (req: Request<{ id: string }>, res: Response<PersonResponseDto>): Promise<void> => {
    const person = await this.service.findById(Number(req.params.id));
    res.status(200).json(toPersonResponseDto(person));
  };

  create = async (req: Request<{}, PersonResponseDto, CreatePersonDto>, res: Response<PersonResponseDto>): Promise<void> => {
    const created = await this.service.create(req.body);
    res.status(201).json(toPersonResponseDto(created));
  };

  update = async (req: Request<{ id: string }, PersonResponseDto, UpdatePersonDto>, res: Response<PersonResponseDto>): Promise<void> => {
    const updated = await this.service.update(Number(req.params.id), req.body); // 👈 await
    res.status(200).json(toPersonResponseDto(updated));
  };

  delete = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    await this.service.delete(Number(req.params.id));
    res.status(204).end();
  };
}
