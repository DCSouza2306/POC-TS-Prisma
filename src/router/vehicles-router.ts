import { Router } from "express";
import { 
    deleteVehicle, 
    getVehicles, 
    getVehiclesById, 
    postVehicle, 
    updateVehicle,
    postCarMaker,
    postModel 
} from "../controller/vehicles-controller.js";
import { schemaValidation } from "../middleware/vehicles-schema-validation.js";
import { vehicleSchema } from "../models/vehicle-schema.js";

const vehiclesRouter = Router();

vehiclesRouter.get("/", getVehicles);
vehiclesRouter.post("/",schemaValidation(vehicleSchema), postVehicle);
vehiclesRouter.get("/:id", getVehiclesById);
vehiclesRouter.patch("/:id",schemaValidation(vehicleSchema), updateVehicle);
vehiclesRouter.delete("/:id", deleteVehicle);
vehiclesRouter.post("/models", postModel);
vehiclesRouter.post("/company", postCarMaker);

export default vehiclesRouter;