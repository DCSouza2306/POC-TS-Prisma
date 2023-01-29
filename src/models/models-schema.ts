import joi from "joi";

export const modelsSchema = joi.object({
 name: joi.string().required(),
 carMaker: joi.string().required(),
 year: joi.number().required(),
});
