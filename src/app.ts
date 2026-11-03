import express from "express";
import cors from "cors";
import {
    exercisesRoutes,
    patientRoutes,
    teacherRoutes
} from "./routes/index.js";
import {
    errorHandler,
    notFoundHandler
} from "./middlewares/errorHandler.js";

const app = express();

app.use(cors());
app.use(express.json());

const healthCheck = (
    _req: express.Request,
    res: express.Response
): void => {
    res.status(200).json({ message: "Servidor funcionando" });
};

app.get("/", healthCheck);
app.get("/health", healthCheck);

app.use("/api/v1/teachers", teacherRoutes);
app.use("/api/v1/patients", patientRoutes);
app.use("/api/v1/exercises", exercisesRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;