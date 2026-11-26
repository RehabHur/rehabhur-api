import { Router } from "express";
import { CommissionController } from "../controllers/index.js";
import { schemaValidator, validateIdParam } from "../middlewares/validate.js";
import { createCommissionSchema, updateCommissionSchema } from "../schemas/comission.schema.js";
import { CommissionRepository } from "../repository/comission.repository.js";
import { CommissionService } from "../services/comission.service.js";

const repository = new CommissionRepository();
const service = new CommissionService(repository);
const controller = new CommissionController(service);
const router = Router();

router
  .get("/", controller.findAll)
  .get("/:id", validateIdParam, controller.findById)
  .post("/", schemaValidator(createCommissionSchema), controller.create)
  .patch("/:id", validateIdParam, schemaValidator(updateCommissionSchema), controller.update)
  .delete("/:id", validateIdParam, controller.delete);

export default router;