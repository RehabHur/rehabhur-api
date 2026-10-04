import { Router } from "express";
import {
    getAllPacients,
    getPacientById,
    // createPacient,
    updatePacient,
    deletePacientById,
} from "../controllers/patient.controller.js";

const router = Router();

//router.get("/", prueba);
router.get("/patients", getAllPacients);

router.get("/patients/:id", getPacientById);

// router.post("/patients", createPacient);

router.put("/patients/:id", updatePacient);

router.delete("/patients/:id", deletePacientById);

export default router;