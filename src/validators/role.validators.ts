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
            "string.base":"permission muust be string!"
        })
    )
    .required().messages({
        "array.base":"permission must be an array of string!",
        "any.required":"Permission are required"
    })
})

export const assignRoleSchema = Joi.object({
    userId:Joi.string().required().messages({
         "string.base":"userId must be string",
        "any.required":"userId must be required"
    }),
    roleIds:Joi.array().items(
        Joi.string().messages({
            "string.base":"roleId musut be string"
        })
    ).required().messages({
        "array.base":"roleIds must be an array",
        "any.required":"roleIds must be required"
    })
})

export const editRoleSchema = Joi.object({
    roleId:Joi.string().required().messages({
         "string.base":"roleId must be string",
        "any.required":"roleId must be required"
    }),
    name:Joi.string().min(3).messages({
        "string.base":"role name must be string",
        "any.required":"role name must be required"
    }),
    permissions:Joi.array().items(Joi.string().valid(...Object.values(Permissions)).messages({
        "string.base":"permission name must be string",
    }).trim().min(1))
    .min(1)
    .messages({
        "array.base":"permissions must be an array of strings",
        "array.min":"At least one permission is required",
        "any.requuired":"permissions must be required"
    })
}).or("name","permissions")
.messages({
    "object.missing":"from name and permissions atleast one is required"
})
