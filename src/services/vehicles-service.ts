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
        await findIdCarMaker(vehicle.carMaker);
        const { id: idColor } = await findIdColor(vehicle.color);

        await vehiclesRepository.insertVehicle(vehicle, idModel, idColor)
    } catch (error) {
        throw error
    }
};

async function getVehicleById(id: number) {
    try {
        const data = await vehiclesRepository.getVehicleById(id);
        const vehicle: vehicle = {
            model: data.models.name,
            carMaker: data.models.carmakers.name,
            year: data.models.year,
            color: data.colors.name,
            licensePlate: data.license_plate,
            status: data.status,
            pricePerDay: data.price_per_day
        }
        return vehicle;
    } catch (error) {
        throw error
    }
};

async function updateVehicle(vehicle: vehicle, id: number){
    try{
        const changeLicense = await vehiclesRepository.getVehicleById(id)
        if(changeLicense.license_plate != vehicle.licensePlate){
            await findLicensePlate(vehicle.licensePlate);
        }
        const { id: idModel } = await findIdModel(vehicle.model, vehicle.year);
        await findIdCarMaker(vehicle.carMaker);
        const { id: idColor } = await findIdColor(vehicle.color);

        await vehiclesRepository.updateVehicle(vehicle, id, idModel, idColor)
    } catch(error){
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
        if (!idModel) {
            throw notFoundError("Can not found this model/year");
        }
        return idModel
    } catch (error) {
        throw error
    }
};

async function findIdCarMaker(carMaker: string) {
    try {
        const idCarMaker = await vehiclesRepository.findIdCarMaker(carMaker);
        if (!idCarMaker) {
            throw notFoundError("Can not find car maker");
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
}

const vehiclesService = {
    getVehicles,
    postVehicle,
    getVehicleById,
    updateVehicle
};

export default vehiclesService