import { Router } from "express";
import { ExerciseController } from "../controllers/exercise.controller.js";
import { schemaValidator, validateIdParam } from "../middlewares/validate.js";
import { createExerciseSchema, updateExerciseSchema} from "../schemas/exercise.schema.js";
import { ExerciseRepository } from "../repository/exercises.repository.js";
import { ExerciseService } from "../services/excercise.service.js";

const repository = new ExerciseRepository();
const service = new ExerciseService(repository);
const controller = new ExerciseController(service);
const router = Router();


router
  .get("/", controller.findAll)
  .get("/:id", validateIdParam, controller.findById)
  .post("/", schemaValidator(createExerciseSchema), controller.create)
  .patch("/:id", validateIdParam, schemaValidator(updateExerciseSchema), controller.update)
  .delete("/:id", validateIdParam, controller.delete);


export default router;