import { ObjectSchema } from "joi";
import { Request, Response, NextFunction } from "express";

export function schemaValidation(schema: ObjectSchema){
    return (req: Request, res: Response, next: NextFunction) => {
        const {error}  = schema.validate(req.body, { abortEarly: false });
        if (!error) {
            next()
        }
        else {
            const errors = error.details.map((detail) => detail.message);
            return res.status(422).send({ message: errors });
        }
    }
}