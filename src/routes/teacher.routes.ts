import { Router } from "express";
import { TeacherController } from "../controllers/index.js";
import { TeacherRepository } from "../repository/teacher.repository.js";
import { createTeacherSchema } from "../schemas/teacher.schema.js";
import {
  schemaValidator,
  existenceValidator,
  numericIdValidator,
} from "../middlewares/validadores.js";

const router = Router();
const teacherController = new TeacherController();
const teacherRepository = new TeacherRepository();

router.get("/", teacherController.getAllTeachers);

//paso por parametro un callback de repository , cuando trabajemos con ORM deberiamos pasar por parametro
//el modelo directamente ahora lo simulamos asi
router.get(
  "/:id",
  numericIdValidator,
  existenceValidator((id) => teacherRepository.getTeacherById(id), "docente"),
  teacherController.getTeacherById,
);

router.post(
  "/",
  schemaValidator(createTeacherSchema),
  teacherController.createTeacher,
);

router.put(
  "/:id",
  numericIdValidator,
  existenceValidator((id) => teacherRepository.getTeacherById(id), "docente"),
  schemaValidator(createTeacherSchema),
  teacherController.updateTeacher,
);


router.delete(
  "/:id",
  numericIdValidator,
  existenceValidator((id) => teacherRepository.getTeacherById(id), "docente"),
  teacherController.deleteTeacherById,
);

export default router;
