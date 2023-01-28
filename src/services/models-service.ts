import modelsRepository from "../repository/models-repository.js";
import { model } from "../protocols.js";
import { conflictError } from "../errors/conflict-error.js";
import { notFoundError } from "../errors/not-found-error.js";

async function postModel(model: model) {
    try {
        const modelExist = await findIdModel(model.name, model.year, "model");
        if (modelExist) {
            throw conflictError("Model/year already registred");
        };

        const { id: idCarMaker } = await findIdCarMaker(model.carMaker);
        if (!idCarMaker) {
            throw notFoundError("Can not found car maker")
        };

        await modelsRepository.insertModel(model, idCarMaker);
    } catch (error) {
        throw error
    }
};

async function deleteModel(id: number) {
    try {
        const modelExist = await modelsRepository.getModelById(id);
        if (!modelExist) {
            throw notFoundError("Can not found model");
        };

        await modelsRepository.deleteModel(id);
    } catch (error) {
        throw error
    }
};

async function findIdModel(model: string, year: number, type: "model" | "vehicle") {
    try {
        const idModel = await modelsRepository.findIdModel(model, year);
        if (!idModel && type == "vehicle") {
            throw notFoundError("Can not found this model/year");
        }
        return idModel
    } catch (error) {
        throw error
    }
};

async function findIdCarMaker(carMaker: string) {
    try {
        const idCarMaker = await modelsRepository.findIdCarMaker(carMaker);
        if (!idCarMaker) {
            throw notFoundError("Can not find car maker");
        }

        return idCarMaker;
    } catch (error) {
        throw error
    }
};

async function postCarMaker(carMaker: string) {
    try {
        const idCarMaker = await modelsRepository.findIdCarMaker(carMaker);
        if (idCarMaker) {
            throw conflictError("Car maker already registred");
        };
        await modelsRepository.insertCarMaker(carMaker);
    } catch (error) {
        throw error
    }
}

const modelsService = {
    postModel,
    deleteModel,
    findIdCarMaker,
    findIdModel,
    postCarMaker
}

export default modelsService;