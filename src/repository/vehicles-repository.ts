import prisma from "../database/database.js";
import { vehicle } from "../protocols.js";

async function getVehicles() {
 return prisma.vehicles.findMany({
  select: {
   id: true,
   models: {
    select: {
     name: true,
     carmakers: {
      select: { name: true },
     },
    },
   },
   colors: {
    select: { name: true },
   },
   price_per_day: true,
   status: true,
  },
 });
}

async function deleteVehicle(id: number) {
 return prisma.vehicles.delete({
  where: { id },
 });
}

async function findLicensePlate(license_plate: string) {
 return prisma.vehicles.findFirst({
  where: {
   license_plate,
  },
 });
}

async function findIdColor(color: string) {
 return prisma.colors.findFirst({
  where: {
   name: color,
  },
  select: {
   id: true,
  },
 });
}

async function insertVehicle(
 vehicle: vehicle,
 idModel: number,
 idColor: number
) {
 return prisma.vehicles.create({
  data: {
   color_id: idColor,
   model_id: idModel,
   license_plate: vehicle.licensePlate,
   price_per_day: vehicle.pricePerDay,
  },
 });
}

async function getVehicleById(id: number) {
 return prisma.vehicles.findFirst({
  where: { id },
  select: {
   id: true,
   models: {
    select: {
     name: true,
     carmakers: {
      select: { name: true },
     },
    },
   },
   colors: {
    select: { name: true },
   },
   license_plate: true,
   price_per_day: true,
   status: true,
  },
 });
}

async function updateVehicle(
 vehicle: vehicle,
 id: number,
 idColor: number,
 idModel: number
) {
 return prisma.vehicles.update({
  where: { id },
  data: {
   color_id: idColor,
   model_id: idModel,
   license_plate: vehicle.licensePlate,
   price_per_day: vehicle.pricePerDay,
  },
 });
}

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
