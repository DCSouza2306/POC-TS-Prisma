import joi from "joi";

export const vehicleSchema = joi.object({
    model: joi.string().required(),
    carMaker: joi.string().required(),
    year: joi.number().required(),
    color: joi.string().required(),
    licensePlate: joi.string().min(7).required(),
    pricePerDay: joi.number().required()
})