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
    const teacher: TeacherResponse | undefined = this.teacherService.getTeacherById(id);

    return res.status(200).json(teacher);
  };

  
}




// export const createTeacher = async (req: Request<{}, {}, CreateTeacherRequest>, res: Response): Promise<Response> => {
//   try {

//     const nexId = teachers.length + 1;

//     const newTeacher: Teacher = {
//       id: nexId,
//       name: req.body.name,
//       lastName: req.body.lastName,
//       email: req.body.email,
//       dni: req.body.dni,
//       comision: req.body.comision,
//     };

//     teachers.push(newTeacher);

//     return res.status(201).json(newTeacher);
//   } catch (error) {
//     return res.status(500).json({ message: "Error en el servidor", error });
//   }
// };

// export const updateTeacher = async (req: Request<{}, {}, UpdateTeacherRequest>, res: Response): Promise<Response> => {
//   try {

//     const id = Number(req.body.id);

//     const teacher = teachers.findIndex((p) => p.id === id);

//     if (!teacher) {
//       return res.status(404).json({ message: `No se encontró ningún docente con id ${id}` });
//     }

//     teachers[teacher] = {
//       id,
//       name: req.body.name,
//       lastName: req.body.lastName,
//       email: req.body.email,
//       dni: req.body.dni,
//       comision: req.body.comision,
//     };

//     return res.status(200).json(teachers[teacher]);
//   } catch (error) {
//     return res.status(500).json({ message: "Error en el servidor", error });
//   }
// };


// export const deleteTeacherById = async (req: Request<{ id: string }>, res: Response): Promise<Response> => {
//   try {
//     const id = Number(req.params.id);

//     if (isNaN(id)) {
//       return res.status(400).json({ message: "El id debe ser numérico" });
//     }

//     const index = teachers.findIndex((p) => p.id === id);

//     if (index === -1) {
//       return res.status(404).json({ message: `El id ${id} no se encuentra.` });
//     }

//     const [deleteTeacher] = teachers.splice(index, 1);

//     return res.status(200).json({ message: "Docente eliminado correctamente", teacher: deleteTeacher });
//   } catch (error) {
//     return res.status(500).json({ message: "Error en el servidor", error });
//   }
// };
