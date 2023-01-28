import joi from "joi";

export const carMakerSchema = joi.object({
    name: joi.string().required()
})