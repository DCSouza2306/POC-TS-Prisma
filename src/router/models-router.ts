import { Router } from "express";
import {
 postModel,
 deleteModel,
 postCarMaker,
} from "../controller/models-controller.js";
import { schemaValidation } from "../middleware/vehicles-schema-validation.js";
import { modelsSchema } from "../models/models-schema.js";
import { carMakerSchema } from "../models/car-makers-schema.js";

const modelsRouter = Router();
modelsRouter.post("/", schemaValidation(modelsSchema), postModel);
modelsRouter.post("/company", schemaValidation(carMakerSchema), postCarMaker);
modelsRouter.delete("/:id", deleteModel);

export default modelsRouter;
