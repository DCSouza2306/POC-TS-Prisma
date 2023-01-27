import { Response, Request } from "express";
import httpStatus from "http-status";
import modelsService from "../services/models-service.js";
import { model } from "../protocols.js";

export async function postModel(req: Request, res: Response) {
    try{
        const model: model = req.body;
        await modelsService.postModel(model);
        res.sendStatus(httpStatus.CREATED)
    } catch(error){
        res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
    }
};


export async function deleteModel(req: Request, res: Response) {
    try {
        const {id} = req.params;

        await modelsService.deleteModel(parseInt(id));
        res.sendStatus(httpStatus.OK)
    } catch (error) {
        if(error.name == "NotFoundError"){
            return res.status(httpStatus.NOT_FOUND).send(error.message)
        }
        res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
    }
};