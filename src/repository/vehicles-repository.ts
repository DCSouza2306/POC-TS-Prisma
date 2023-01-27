import prisma from "../database/database.js";
import { vehicle } from "../protocols.js";

async function getVehicles() {
    try {
        return prisma.vehicles.findMany({
            include: {
                models: {
                    include: { carmakers: { select: { name: true } } }
                },
                colors: { select: { name: true } }
            }
        })
    } catch (error) {
        throw error
    }
};

async function findLicensePlate(license_plate: string){
    try{
        return prisma.vehicles.findFirst({
            where:{
                license_plate
            }
        })
    } catch(error) {
        throw error
    }
};

async function findIdModel(model: string, year: number){
    try{
        return prisma.models.findFirst({
            where:{
                name: model,
                year
            },
            select:{
                id: true,
            }
        })
    } catch(error) {
        throw error
    }
}

async function findIdCarMaker(carMaker: string){
    try{
        return prisma.carmakers.findFirst({
            where:{
                name: carMaker,
            },
            select:{
                id: true,
            }
        })
    } catch(error) {
        throw error
    }
};

async function findIdColor(color: string){
    try{
        return prisma.colors.findFirst({
            where:{
                name: color,
            },
            select:{
                id: true,
            }
        })
    } catch(error) {
        throw error
    }
};

async function insertVehicle( 
    vehicle: vehicle, 
    idColor: number, 
    idModel: number
    ){

    try{
        return prisma.vehicles.create({
            data:{
                color_id: idColor,
                model_id: idModel,
                license_plate: vehicle.licensePlate,
                price_per_day: vehicle.pricePerDay
            }
        })
    } catch(error) {
        throw error
    }
}

const vehiclesRepository = {
    getVehicles,
    findLicensePlate,
    findIdModel,
    findIdCarMaker,
    findIdColor,
    insertVehicle
};

export default vehiclesRepository;