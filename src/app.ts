import express from "express";
import { teacherRoutes, patientRoutes, exercisesRoutes } from "./routes/index.js";

const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
    res.status(200).json({ message: "Servidor funcionando" });
});

app.use("/api/v1/teachers", teacherRoutes);
app.use("/api/v1/patients", patientRoutes);
app.use("/api/v1/exercises", exercisesRoutes);

export default app;