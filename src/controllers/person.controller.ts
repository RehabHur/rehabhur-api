import type { Request, Response } from "express";
import { PersonService } from "../services/person.service.js";
import { PersonResponseDto, toPersonResponseDto } from "../dtos/person-response.dto.js";
import type { CreatePersonDto, UpdatePersonDto } from "../schemas/person.schema.js";

export class PersonController {
  constructor(private readonly service: PersonService) {}

  findAll = (_req: Request, res: Response<PersonResponseDto[]>): void => {
    const persons = this.service.findAll().map(toPersonResponseDto);
    res.status(200).json(persons);
  };

  findById = (req: Request<{ id: string }>, res: Response<PersonResponseDto>): void => {
    const person = this.service.findById(Number(req.params.id));
    res.status(200).json(toPersonResponseDto(person));
  };

  create = (req: Request<{}, PersonResponseDto, CreatePersonDto>, res: Response<PersonResponseDto>): void => {
    const created = this.service.create(req.body);
    res.status(201).json(toPersonResponseDto(created));
  };

  update = (req: Request<{ id: string }, PersonResponseDto, UpdatePersonDto>, res: Response<PersonResponseDto>): void => {
    const updated = this.service.update(Number(req.params.id), req.body);
    res.status(200).json(toPersonResponseDto(updated));
  };

  delete = (req: Request<{ id: string }>, res: Response): void => {
    this.service.delete(Number(req.params.id));
    res.status(204).end();
  };
}
