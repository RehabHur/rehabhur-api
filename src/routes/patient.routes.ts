import { Router } from "express";

import { PatientController } from "../controllers/patient.controller.js";
import { schemaValidator, validateIdParam } from "../middlewares/validate.js";
import { PatientRepository } from "../repository/patients.repository.js";
import { createPatientSchema, updatePatientSchema } from "../schemas/patient.schema.js";
import { PatientService } from "../services/patient.service.js";

const repository = new PatientRepository();
const service = new PatientService(repository);
const controller = new PatientController(service);
const router = Router();

router
  .get("/", controller.findAll)
  .get("/:id", validateIdParam, controller.findById)
  .post("/", schemaValidator(createPatientSchema), controller.create)
  .patch("/:id", validateIdParam, schemaValidator(updatePatientSchema), controller.update)
  .delete("/:id", validateIdParam, controller.delete);

export default router;
