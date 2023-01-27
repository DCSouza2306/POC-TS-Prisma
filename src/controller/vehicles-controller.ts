import { Response, Request } from "express";
import httpStatus from "http-status";
import vehiclesService from "../services/vehicles-service.js";
import { vehicle } from "../protocols.js";


export async function getVehicles(req: Request, res: Response) {
    try {
        const vehicles = await vehiclesService.getVehicles();
        res.send(vehicles)
    } catch (error) {
        res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
    }
};

export async function postVehicle(req: Request, res: Response) {
    try {
        const vehicle = req.body as vehicle;
        await vehiclesService.postVehicle(vehicle);
        res.sendStatus(httpStatus.CREATED)
    } catch (error) {
        if (error.name == "NotFoundError") {
            return res.status(httpStatus.NOT_FOUND).send(error.message)
        };

        if (error.name = "ConflictError") {
            return res.status(httpStatus.CONFLICT).send(error.message)
        }
        res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
    }
};

export async function getVehiclesById(req: Request, res: Response) {
    try {
        const { id } =req.params
        const vehicle = await vehiclesService.getVehicleById(parseInt(id));
        res.send(vehicle);
    } catch (error) {
        console.log(error)
        res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
    }
};

export async function updateVehicle(req: Request, res: Response) {
    try {
        const vehicle = req.body as vehicle;
        const {id} = req.params
        await vehiclesService.updateVehicle(vehicle, parseInt(id));
        res.sendStatus(httpStatus.OK)
    } catch (error) {
        if (error.name == "NotFoundError") {
            return res.status(httpStatus.NOT_FOUND).send(error.message)
        };

        if (error.name = "ConflictError") {
            return res.status(httpStatus.CONFLICT).send(error.message)
        }
        res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
    }
};

export async function deleteVehicle(req: Request, res: Response) {
    try {

    } catch (error) {
        res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
    }
}
