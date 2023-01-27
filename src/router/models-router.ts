import { Router } from "express";
import { postModel, deleteModel } from "../controller/models-controller.js";
import { schemaValidation } from "../middleware/vehicles-schema-validation.js";
import { vehicleSchema } from "../models/vehicle-schema.js";

const modelsRouter = Router();
modelsRouter.post("/", postModel);
modelsRouter.delete("/:id", deleteModel)


export default modelsRouter;