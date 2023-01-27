import vehiclesRepository from "../repository/vehicles-repository.js";
import { model, vehicle } from "../protocols.js";
import { conflictError } from "../errors/conflict-error.js";
import { notFoundError } from "../errors/not-found-error.js";
import modelsService from "./models-service.js";

async function getVehicles() {
    try {
        const data = await vehiclesRepository.getVehicles();
        return data;
    } catch (error) {
        throw error
    }
};

async function postVehicle(vehicle: vehicle) {
    try {
        await findLicensePlate(vehicle.licensePlate);
        const { id: idModel } = await modelsService.findIdModel(vehicle.model, vehicle.year);
        await modelsService.findIdCarMaker(vehicle.carMaker);
        const { id: idColor } = await findIdColor(vehicle.color);

        await vehiclesRepository.insertVehicle(vehicle, idModel, idColor)
    } catch (error) {
        throw error
    }
};

async function getVehicleById(id: number) {
    try {
        const data = await vehiclesRepository.getVehicleById(id);
        return data;
    } catch (error) {
        throw error
    }
};

async function updateVehicle(vehicle: vehicle, id: number){
    try{
        const updateVehicle = await vehiclesRepository.getVehicleById(id);
        if(!updateVehicle){
            throw notFoundError("Can not found vehicle");
        }
        if(updateVehicle.license_plate != vehicle.licensePlate){
            await findLicensePlate(vehicle.licensePlate);
        }
        const { id: idModel } = await modelsService.findIdModel(vehicle.model, vehicle.year);
        await modelsService.findIdCarMaker(vehicle.carMaker);
        const { id: idColor } = await findIdColor(vehicle.color);

        await vehiclesRepository.updateVehicle(vehicle, id, idModel, idColor)
    } catch(error){
        throw error
    }
};

async function deleteVehicle(id: number){
    try{
        const updateVechicle = await vehiclesRepository.getVehicleById(id);
        if(!updateVechicle){
            throw notFoundError("Can not found vehicle");
        };

        await vehiclesRepository.deleteVehicle(id);
    } catch(error) {
        throw error
    }
};

async function findLicensePlate(licensePlate: string) {
    try {
        const licensePlateExist = await vehiclesRepository.findLicensePlate(licensePlate);
        if (licensePlateExist) {
            throw conflictError("License plate already registred")
        }
    } catch (error) {
        throw error
    }
};



async function findIdColor(color: string) {
    try {
        const idColor = await vehiclesRepository.findIdColor(color);
        if (!idColor) {
            throw notFoundError("Can not find color");
        }
        return idColor;
    } catch (error) {
        throw error
    }
};



const vehiclesService = {
    getVehicles,
    postVehicle,
    getVehicleById,
    updateVehicle,
    deleteVehicle
};

export default vehiclesService