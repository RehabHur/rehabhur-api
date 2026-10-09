import express from "express";
import routesPacients from "./routes/patient.routes.js"
import routesTeaching from "./routes/teacher.routes.js"
import exerciseRoutes from "./routes/exercises.js";

const app = express();


app.use(express.json());

app.get("/", (_req, res) => {
    res.status(200).json({ message: "Servidor funcionando" });
});

app.use("/api/v1/patients", routesPacients);
app.use("/api/v1/teachers", routesTeaching);


export default app;