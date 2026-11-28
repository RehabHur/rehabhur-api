import { Router } from "express";
import { StudentController } from "../controllers/student.controller.js";
import { schemaValidator, validateIdParam } from "../middlewares/validate.js";
import {
  createStudentSchema,
  updateStudentSchema,
  assignPatientsToStudentSchema,
} from "../schemas/student.schema.js";
import { StudentRepository } from "../repository/stuents.repository.js";
import { CommissionRepository } from "../repository/comission.repository.js";
import { StudentService } from "../services/student.service.js";

const repository = new StudentRepository();
const commissionRepository = new CommissionRepository();
const service = new StudentService(repository, commissionRepository);
const controller = new StudentController(service);
const router = Router();

router
  .get("/", controller.findAll)
  .get("/:id", validateIdParam, controller.findById)
  .post("/", schemaValidator(createStudentSchema), controller.create)
  .post(
    "/:id/patients",
    schemaValidator(assignPatientsToStudentSchema),
    controller.addPatients,
  )
  .patch(
    "/:id",
    validateIdParam,
    schemaValidator(updateStudentSchema),
    controller.update,
  )
  .delete("/:id", validateIdParam, controller.delete)
  .delete(
  "/:id/patients",
  schemaValidator(assignPatientsToStudentSchema),
  controller.removePatient,
);

export default router;
