import vehiclesRepository from "../repository/vehicles-repository.js";
import { vehicle } from "../protocols.js";
import { conflictError } from "../errors/conflict-error.js";
import { notFoundError } from "../errors/not-found-error.js";

async function getVehicles() {
    try {
        const data = await vehiclesRepository.getVehicles();
        const vehicles: object[] = [];
        for (let i = 0; i < data.length; i++) {
            vehicles.push({
                model: data[i].models.name,
                carMaker: data[i].models.carmakers.name,
                year: data[i].models.year,
                color: data[i].colors.name,
                licensePlate: data[i].license_plate,
                status: data[i].status,
                pricePerDay: data[i].price_per_day
            })
        }
        return vehicles;
    } catch (error) {
        throw error
    }
};

async function postVehicle(vehicle: vehicle) {
    try {
        await findLicensePlate(vehicle.licensePlate);
        const { id: idModel } = await findIdModel(vehicle.model, vehicle.year);
        const { id: idCarMaker } = await findIdCarMaker(vehicle.carMaker);
        const { id: idColor } = await findIdColor(vehicle.color);

        await vehiclesRepository.insertVehicle(vehicle, idModel, idColor)
    } catch (error) {
        throw error
    }
}

async function findLicensePlate(licensePlate: string) {
    try {
        const licensePlateExist = await vehiclesRepository.findLicensePlate(licensePlate);
        if (licensePlateExist) {
            throw conflictError("License plate already registred")
        }
    } catch (error) {
        throw error
    }
}

async function findIdModel(model: string, year: number) {
    try {
        const idModel = await vehiclesRepository.findIdModel(model, year);
        if(!idModel){
            throw notFoundError("Can not found this model");
        }
        return idModel
    } catch (error) {
        throw error
    }
};

async function findIdCarMaker(carMaker: string) {
    try {
        const idCarMaker = await vehiclesRepository.findIdCarMaker(carMaker);
        if(!idCarMaker){
            throw notFoundError("Can not find car maker");
        }
        return idCarMaker
    } catch (error) {
        throw error
    }
};

async function findIdColor(color: string) {
    try {
        const idColor = await vehiclesRepository.findIdColor(color);
        if(!idColor){
            throw notFoundError("Can not find color");
        }
        return idColor;
    } catch (error) {
        throw error
    }
}

const vehiclesService = {
    getVehicles,
    postVehicle
};

export default vehiclesService