import express from "express";
import routesPacients from "./routes/pacientRoute.js"
import routesTeaching from "./routes/teachingRoute.js"

const app = express();


app.use(express.json());

app.use("/", routesPacients);
app.use("/", routesTeaching);


export default app;