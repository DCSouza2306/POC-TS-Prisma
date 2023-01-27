import { Router } from "express";
import { 
    deleteVehicle, 
    getVehicles, 
    getVehiclesById, 
    postVehicle, 
    updateVechicle 
} from "../controller/vehicles-controller.js";

const vehiclesRouter = Router();

vehiclesRouter.get("/", getVehicles);
vehiclesRouter.post("/", postVehicle);
vehiclesRouter.get("/:id", getVehiclesById);
vehiclesRouter.patch("/:id", updateVechicle);
vehiclesRouter.delete("/:id", deleteVehicle);

export default vehiclesRouter;