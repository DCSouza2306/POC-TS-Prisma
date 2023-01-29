import vehiclesRepository from "../repository/vehicles-repository.js";
import { model, vehicle } from "../protocols.js";
import { conflictError } from "../errors/conflict-error.js";
import { notFoundError } from "../errors/not-found-error.js";
import modelsService from "./models-service.js";

async function getVehicles() {
 const data = await vehiclesRepository.getVehicles();
 return data;
}

async function postVehicle(vehicle: vehicle) {
 await findLicensePlate(vehicle.licensePlate);
 const { id: idModel } = await modelsService.findIdModel(
  vehicle.model,
  vehicle.year,
  "vehicle"
 );
 await modelsService.findIdCarMaker(vehicle.carMaker);
 const { id: idColor } = await findIdColor(vehicle.color);

 await vehiclesRepository.insertVehicle(vehicle, idModel, idColor);
}

async function getVehicleById(id: number) {
 const data = await vehiclesRepository.getVehicleById(id);
 return data;
}

async function updateVehicle(vehicle: vehicle, id: number) {
 const updateVehicle = await vehiclesRepository.getVehicleById(id);
 if (!updateVehicle) {
  throw notFoundError("Can not found vehicle");
 }
 if (updateVehicle.license_plate != vehicle.licensePlate) {
  await findLicensePlate(vehicle.licensePlate);
 }
 const { id: idModel } = await modelsService.findIdModel(
  vehicle.model,
  vehicle.year,
  "vehicle"
 );
 await modelsService.findIdCarMaker(vehicle.carMaker);
 const { id: idColor } = await findIdColor(vehicle.color);

 await vehiclesRepository.updateVehicle(vehicle, id, idModel, idColor);
}

async function deleteVehicle(id: number) {
 const updateVechicle = await vehiclesRepository.getVehicleById(id);
 if (!updateVechicle) {
  throw notFoundError("Can not found vehicle");
 }

 await vehiclesRepository.deleteVehicle(id);
}

async function findLicensePlate(licensePlate: string) {
 const licensePlateExist = await vehiclesRepository.findLicensePlate(
  licensePlate
 );
 if (licensePlateExist) {
  throw conflictError("License plate already registred");
 }
}

async function findIdColor(color: string) {
 const idColor = await vehiclesRepository.findIdColor(color);
 if (!idColor) {
  throw notFoundError("Can not find color");
 }
 return idColor;
}

const vehiclesService = {
 getVehicles,
 postVehicle,
 getVehicleById,
 updateVehicle,
 deleteVehicle,
};

export default vehiclesService;
