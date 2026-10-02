import { Router } from "express";
import {
  getAllPacients,
  getPacientById,
  createPacient,
  updatePacient,
  deletePacientById,
} from "../controllers/pacientController.js";

const router = Router();

router.get("/pacients", getAllPacients);
router.get("/pacients/:id", getPacientById);
router.post("/pacients", createPacient);
router.put("/pacients/:id", updatePacient);
router.delete("/pacients/:id", deletePacientById);

export default router;