import { Request, Response } from "express";
import { TeacherService } from "../services/teacher.service.js";
import { TeacherResponse } from "../repository/dto/teacher-response.dto.js";

interface TeacherParams {
  id: string;
}

export class TeacherController {
  private teacherService: TeacherService;

  constructor() {
    this.teacherService = new TeacherService();
  }

  //Todos
  getAllTeachers = async (_req: Request, res: Response): Promise<Response> => {
    const teachers: TeacherResponse[] = this.teacherService.getAllTeachers();

    return res.status(200).json(teachers);
  };

  getTeacherById = async (req: Request<TeacherParams>, res: Response): Promise<Response> => {
    // TypeScript sabe que 'req.params.id' existe y no te deja pedir 'req.params.algoRaro'
    const id: number = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ message: "El ID debe ser un número válido" });
    }

    const { teacher, errorCode } = await this.teacherService.getTeacherById(id);

    return res.status(errorCode || 200).json(teacher);
  };


  createTeacher = async (req: Request, res: Response): Promise<Response> => {
    const created = this.teacherService.createTeacher(req.body);
    return res.status(201).json(created);
  };

  updateTeacher = async (req: Request, res: Response): Promise<Response> => {

    const id: number = Number(req.params.id);
    const updated = this.teacherService.updateTeacher(id, req.body);
    return res.status(200).json(updated);
  };

  deleteTeacherById = async (
    req: Request,
    res: Response,
  ): Promise<Response> => {
    const id: number = Number(req.params.id);
    const deleted = this.teacherService.deleteTeacherById(id);
    return res.status(200).json(deleted);
  };
}
