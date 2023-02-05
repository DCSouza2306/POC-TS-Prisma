import prisma from "../database/database";
import { model } from "../protocols";

async function insertModel(model: model, idCarMaker: number) {
 try {
  return prisma.models.create({
   data: {
    name: model.name,
    carmaker_id: idCarMaker,
    year: model.year,
   },
  });
 } catch (error) {
  throw error;
 }
}

async function getModelById(id: number) {
 try {
  return prisma.models.findFirst({
   where: { id },
  });
 } catch (error) {
  throw error;
 }
}

async function deleteModel(id: number) {
 try {
  return prisma.models.delete({
   where: { id },
  });
 } catch (error) {
  throw error;
 }
}

async function findIdModel(model: string, year: number) {
 try {
  return prisma.models.findFirst({
   where: {
    name: model,
    year,
   },
   select: {
    id: true,
   },
  });
 } catch (error) {
  throw error;
 }
}

async function findIdCarMaker(carMaker: string) {
 return prisma.carmakers.findFirst({
  where: {
   name: carMaker,
  },
  select: {
   id: true,
  },
 });
}

async function insertCarMaker(carMaker: string) {
 return prisma.carmakers.create({
  data: {
   name: carMaker,
  },
 });
}

const modelsRepository = {
 insertModel,
 getModelById,
 deleteModel,
 findIdModel,
 findIdCarMaker,
 insertCarMaker,
};

export default modelsRepository;
