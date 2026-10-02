import express from "express";
import routesPacients from "./routes/pacientRoute.js"

const app = express();


app.use(express.json());

app.use("/", routesPacients);


export default app;