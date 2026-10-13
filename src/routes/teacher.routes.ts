import { Router } from "express";
import { TeacherController } from "../controllers/index.js";

const router = Router();
const teacherController = new TeacherController();

router.get("/", teacherController.getAll);

router.get("/:id", teacherController.getById);

router.post("/", teacherController.create);

router.put("/:id", teacherController.update);

router.delete("/:id", teacherController.deleteById);

export default router;
