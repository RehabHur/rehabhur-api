import { Router } from "express";
import {
    getAllTeaching,
    getTeachingById,
    createTeaching,
    updateTeaching,
    deleteTeachingById,
    prueba,
} from "../controllers/teachingControllers.js";

const router = Router();

router.get("/", prueba);
router.get("/teaching", getAllTeaching);
router.get("/teaching/:id", getTeachingById);
router.post("/teaching", createTeaching);
router.put("/teaching/:id", updateTeaching);
router.delete("/teaching/:id", deleteTeachingById);

export default router;