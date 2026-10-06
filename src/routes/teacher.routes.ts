import { Router } from "express";
import { TeacherController } from "../controllers/teacher.controller.js";

const router = Router();

// Create an instance of the TeacherController
const teacherController = new TeacherController();

router.get("/", teacherController.getAllTeachers);

// router.get("/teachers/:id", getTeacherById);

// router.post("/teachers", createTeacher);

// router.put("/teachers/:id", updateTeacher);

// router.delete("/teachers/:id", deleteTeacherById);

export default router;