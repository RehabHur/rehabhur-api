import { Request, Response } from "express";
import { TeacherService } from "../services/teacher.service.js";
import { TeacherResponse } from "../repository/dto/teacher-response.dto.js";

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

  getTeacherById = async (req: Request, res: Response): Promise<Response> => {
    const id: number = Number(req.params.id);
    const teacher: TeacherResponse | undefined =
      this.teacherService.getTeacherById(id);

    return res.status(200).json(teacher);
  };

  //Si quisieramos crear otro docente , el unico campo que deberia ser unico en la db seria el dni
  //cuando trabajemos con modelos podemos darle esa restriccion al modelo , que este campo sea unique
  //evitando duplicados
  createTeacher = async (req: Request, res: Response): Promise<Response> => {
    const created = this.teacherService.createTeacher(req.body);
    return res.status(201).json(created);
  };

  updateTeacher = async (req: Request, res: Response): Promise<Response> => {
    ///lo convierto a number aunque la app valida que es numerico , el compilador aqui lo lee nuevamente como string
    //debo optimizarlo
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
