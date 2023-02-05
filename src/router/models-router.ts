import { Router } from "express";
import {
 postModel,
 deleteModel,
 postCarMaker,
} from "../controller/models-controller";
import { schemaValidation } from "../middleware/vehicles-schema-validation";
import { modelsSchema } from "../models/models-schema";
import { carMakerSchema } from "../models/car-makers-schema";

const modelsRouter = Router();
modelsRouter.post("/", schemaValidation(modelsSchema), postModel);
modelsRouter.post("/company", schemaValidation(carMakerSchema), postCarMaker);
modelsRouter.delete("/:id", deleteModel);

export default modelsRouter;
