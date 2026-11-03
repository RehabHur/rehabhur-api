import { Router } from "express";
import { PatientController } from "../controllers/patient.controller.js";
import { validateIdParam } from "../middlewares/validate.js";

const router = Router();
const patientController = new PatientController();

router.get("/", patientController.getAllPacients);
router.get("/:id", validateIdParam, patientController.getPacientById);
router.patch("/:id", validateIdParam, patientController.updatePacient);
router.delete("/:id", validateIdParam, patientController.deletePacientById);

export default router;
