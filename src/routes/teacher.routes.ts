import { Router } from "express";
import {
    getAllTeachers,
    getTeacherById,
    createTeacher,
    updateTeacher,
    deleteTeacherById
} from "../controllers/teacher.controller.js";

const router = Router();

router.get("/teachers", getAllTeachers);

router.get("/teachers/:id", getTeacherById);

router.post("/teachers", createTeacher);

router.put("/teachers/:id", updateTeacher);

router.delete("/teachers/:id", deleteTeacherById);

export default router;