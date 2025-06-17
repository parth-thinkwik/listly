import Joi from "joi";

export const getAdminQuerySchema = Joi.object({
  userId: Joi.string().required().messages({
      "any.required": "user ID is required",
    }),
});