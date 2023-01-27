import prisma from "../database/database.js";
import { model, vehicle } from "../protocols.js";

async function getVehicles() {
    try {
        return prisma.vehicles.findMany({
            select: {
                id: true,
                models: {
                    select: {
                        name: true,
                        carmakers: {
                            select: { name: true }
                        }
                    }
                },
                colors: {
                    select: { name: true }
                },
                price_per_day: true,
                status: true,
            }
        })
    } catch (error) {
        throw error
    }
};

async function deleteVehicle(id: number) {
    try {
        return prisma.vehicles.delete({
            where: { id }
        })
    } catch (error) {
        throw error
    }
}

async function findLicensePlate(license_plate: string) {
    try {
        return prisma.vehicles.findFirst({
            where: {
                license_plate
            }
        })
    } catch (error) {
        throw error
    }
};



async function findIdColor(color: string) {
    try {
        return prisma.colors.findFirst({
            where: {
                name: color,
            },
            select: {
                id: true,
            }
        })
    } catch (error) {
        throw error
    }
};

async function insertVehicle(
    vehicle: vehicle,
    idColor: number,
    idModel: number
) {

    try {
        return prisma.vehicles.create({
            data: {
                color_id: idColor,
                model_id: idModel,
                license_plate: vehicle.licensePlate,
                price_per_day: vehicle.pricePerDay
            }
        })
    } catch (error) {
        throw error
    }
};

async function getVehicleById(id: number) {
    try {
        return prisma.vehicles.findFirst({
            where: { id },
            select: {
                id: true,
                models: {
                    select: {
                        name: true,
                        carmakers: {
                            select: { name: true }
                        }
                    }
                },
                colors: {
                    select: { name: true }
                },
                license_plate: true,
                price_per_day: true,
                status: true,
            }
        })
    } catch (error) {
        throw error
    }
};

async function updateVehicle(
    vehicle: vehicle,
    id: number,
    idColor: number,
    idModel: number
) {
    try {
        return prisma.vehicles.update({
            where: { id },
            data: {
                color_id: idColor,
                model_id: idModel,
                license_plate: vehicle.licensePlate,
                price_per_day: vehicle.pricePerDay
            }
        })
    } catch (error) {
        throw error
    }
};



const vehiclesRepository = {
    getVehicles,
    getVehicleById,
    findLicensePlate,
    findIdColor,
    insertVehicle,
    updateVehicle,
    deleteVehicle,
};

export default vehiclesRepository;