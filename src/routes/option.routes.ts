import { Router } from "express";
import { OptionController } from "../controllers/option.controller.js";

const controller = new OptionController();
const router = Router();

router
    .get("/body-regions", controller.getBodyRegions)
    .get("/motion-types", controller.getMotionTypes)
    .get("/materials", controller.getMaterials);

export default router;
