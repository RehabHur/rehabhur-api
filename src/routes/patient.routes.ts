import { Router } from "express";
import {
    PatientController
} from "../controllers/patient.controller.js";




const router = Router();
const patientController = new PatientController();

//router.get("/", prueba);
router.get("/patients", patientController.getAllPacients);

router.get("/patients/:id", patientController.getPacientById);

// router.post("/patients", createPacient);

router.put("/patients/:id", patientController.updatePacient);

router.delete("/patients/:id", patientController.deletePacientById);

export default router; 