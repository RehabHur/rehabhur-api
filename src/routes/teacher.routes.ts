import { Router } from "express";
import { TeacherController } from "../controllers/teacher.controller.js";
import { TeacherService } from "../services/teacher.service.js";
import {
  validadorIdNumerico,
  validadorExistencia,
} from "../middlewares/validadores.js";

const router = Router();
const teacherController = new TeacherController();
const teacherService = new TeacherService();

router.get(
  "/",
  teacherController.getAllTeachers
);

router.get(
  "/:id",
  validadorIdNumerico,
  validadorExistencia((id) => teacherService.getTeacherById(id), "docente"),
  teacherController.getTeacherById
);

export default router;