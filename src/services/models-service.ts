import modelsRepository from "../repository/models-repository";
import { model } from "../protocols.js";
import { conflictError } from "../errors/conflict-error";
import { notFoundError } from "../errors/not-found-error";

async function postModel(model: model) {
 const modelExist = await findIdModel(model.name, model.year, "model");
 if (modelExist) {
  throw conflictError("Model/year already registred");
 }

 const { id: idCarMaker } = await findIdCarMaker(model.carMaker);
 if (!idCarMaker) {
  throw notFoundError("Can not found car maker");
 }

 await modelsRepository.insertModel(model, idCarMaker);
}

async function deleteModel(id: number) {
 const modelExist = await modelsRepository.getModelById(id);
 if (!modelExist) {
  throw notFoundError("Can not found model");
 }

 await modelsRepository.deleteModel(id);
}

async function findIdModel(
 model: string,
 year: number,
 type: "model" | "vehicle"
) {
 const idModel = await modelsRepository.findIdModel(model, year);
 if (!idModel && type == "vehicle") {
  throw notFoundError("Can not found this model/year");
 }
 return idModel;
}

async function findIdCarMaker(carMaker: string) {
 const idCarMaker = await modelsRepository.findIdCarMaker(carMaker);
 if (!idCarMaker) {
  throw notFoundError("Can not find car maker");
 }

 return idCarMaker;
}

async function postCarMaker(carMaker: string) {
 const idCarMaker = await modelsRepository.findIdCarMaker(carMaker);
 if (idCarMaker) {
  throw conflictError("Car maker already registred");
 }
 await modelsRepository.insertCarMaker(carMaker);
}

const modelsService = {
 postModel,
 deleteModel,
 findIdCarMaker,
 findIdModel,
 postCarMaker,
};

export default modelsService;
