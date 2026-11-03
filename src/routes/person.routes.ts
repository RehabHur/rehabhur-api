import { Router } from "express";
import { PersonController } from "../controllers/person.controller.js";
import { schemaValidator, validateIdParam } from "../middlewares/validate.js";
import { createPersonSchema, updatePersonSchema } from "../schemas/person.schema.js";
import { PersonRepository } from "../repository/persons.repository.js";
import { PersonService } from "../services/person.service.js";

const repository = new PersonRepository();
const service = new PersonService(repository);
const controller = new PersonController(service);
const router = Router();

router
  .get("/", controller.findAll)
  .get("/:id", validateIdParam, controller.findById)
  .post("/", schemaValidator(createPersonSchema), controller.create)
  .patch("/:id", validateIdParam, schemaValidator(updatePersonSchema), controller.update)
  .delete("/:id", validateIdParam, controller.delete);

export default router;
