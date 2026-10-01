import express from "express";

import exerciseRoutes from "./routes/exercises.js";

const app = express();

app.use(express.json());

app.get("/", (_, res) => {
  res.status(200).json({
    message: "Servidor funcionando",
  });
});

app.get("/health", (_, res) => {
  res.status(200).json({
    message: "Servidor funcionando",
  });
});

app.use("/api/v1/exercises", exerciseRoutes);

export default app;