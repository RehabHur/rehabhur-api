import { Router } from "express";
import { TeacherController } from "../controllers/teacher.controller.js";
import { schemaValidator, validateIdParam } from "../middlewares/validate.js";
import { createTeacherSchema, updateTeacherSchema } from "../schemas/teacher.schema.js";
import { TeacherRepository } from "../repository/teacher.repository.js";
import { TeacherService } from "../services/teacher.service.js";

const repository = new TeacherRepository();
const service = new TeacherService(repository);
const controller = new TeacherController(service);
const router = Router();

router
  .get("/", controller.findAll)
  .get("/:id", validateIdParam, controller.findById)
  .post("/", schemaValidator(createTeacherSchema), controller.create)
  .patch("/:id", validateIdParam, schemaValidator(updateTeacherSchema), controller.update)
  .delete("/:id", validateIdParam, controller.delete);

export default router;
