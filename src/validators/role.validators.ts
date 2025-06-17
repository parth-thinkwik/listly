import Joi from "joi";
import { Permissions } from "../constants/enums";


export const createRoleSchema = Joi.object({
    name:Joi.string().required().messages({
        "string.base":"role name must be string",
        "any.required":"role name must be required"
    }),
    permissions:Joi.array().items(
        Joi.string().valid(...Object.values(Permissions))
        .messages({
            "string base":"permission muust be string!"
        })
    )
    .required().messages({
        "array.base":"permission must be an array of string!",
        "any.required":"Permission are required"
    })
})