import { Router } from "express";
import { TeacherController } from "../controllers/teacher.controller.js";
import { TeacherRepository } from "../repository/teacher.repository.js";
import { createTeacherSchema } from "../schemas/teacher.schema.js";
import {
  validadorIdNumerico,
  validadorExistencia,
  validadorSchema,
} from "../middlewares/validadores.js";

const router = Router();
const teacherController = new TeacherController();
const teacherRepository = new TeacherRepository();

router.get("/", teacherController.getAllTeachers);

//paso por parametro un callback de repository , cuando trabajemos con ORM deberiamos pasar por parametro
//el modelo directamente ahora lo simulamos asi
router.get(
  "/:id",
  validadorIdNumerico,
  validadorExistencia((id) => teacherRepository.getTeacherById(id), "docente"),
  teacherController.getTeacherById,
);

router.post(
  "/",
  validadorSchema(createTeacherSchema),
  teacherController.createTeacher,
);

router.put(
  "/:id",
  validadorIdNumerico,
  validadorExistencia((id) => teacherRepository.getTeacherById(id), "docente"),
  validadorSchema(createTeacherSchema),
  teacherController.updateTeacher,
);


router.delete(
  "/:id",
  validadorIdNumerico,
  validadorExistencia((id) => teacherRepository.getTeacherById(id), "docente"),
  teacherController.deleteTeacherById,
);

export default router;
