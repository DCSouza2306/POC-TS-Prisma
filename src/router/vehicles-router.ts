import { Router } from "express";
import { deleteVehicle, getVehicles, getVehiclesById, postVehicles, updateVechicle } from "../controller/vehicles-controller";

const vehiclesRouter = Router();

vehiclesRouter.get("/", getVehicles);
vehiclesRouter.post("/", postVehicles);
vehiclesRouter.get("/:id", getVehiclesById);
vehiclesRouter.patch("/:id", updateVechicle);
vehiclesRouter.delete("/:id", deleteVehicle);

export default vehiclesRouter;