import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import {
  authRoutes,
  exercisesRoutes,
  optionRoutes,
  patientRoutes,
  personRoutes,
  studentRoutes,
  teacherRoutes,
  userRoutes,
  comissionRoutes,
} from "./routes/index.js";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler.js";

const app = express();

const defaultOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "http://localhost:4200",
];

const configuredOrigins = (process.env.CORS_ORIGIN ?? "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    // Con cookies credenciales no se permite comodín: hay que listar los orígenes.
    origin: configuredOrigins.length > 0 ? configuredOrigins : defaultOrigins,
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());

const healthCheck = (_req: express.Request, res: express.Response): void => {
  res.status(200).json({ message: "Servidor funcionando" });
};

app.get("/", healthCheck);
app.get("/health", healthCheck);

app.use("/api/v1/teachers", teacherRoutes);
app.use("/api/v1/patients", patientRoutes);
app.use("/api/v1/students", studentRoutes);
app.use("/api/v1/persons", personRoutes);
app.use("/api/v1/exercises", exercisesRoutes);
app.use("/api/v1/options", optionRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/comissions", comissionRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
