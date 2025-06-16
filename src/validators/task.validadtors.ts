import Joi from "joi";


export const createTaskSchema = Joi.object({
    title:Joi.string().required().messages({
        "string.base":"title must be string",
        "any.required":"title must be required"
    }),
    description:Joi.string().required().messages({
        "string.base":"description must be string",
        "any.required":"descrioption muust be required"
    }),
    dueDate:Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).messages({
        "string.base":"description must be string",
        "date.base": "Due date must be a valid date",
        "any.required":"due-date muust be required"
    })
    
})

export const updateTaskSchema = Joi.object({
  title: Joi.string().optional().messages({
    "string.base": "Title must be a string",
  }),
  description: Joi.string().optional().messages({
    "string.base": "Description must be a string",
  }),
  taskId: Joi.string().required().messages({
    "any.required": "Todo ID is required",
  }),
  dueDate: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}$/)
    .optional()
    .messages({
      "string.pattern.base": "Due date must be in 'yyyy-mm-dd' format",
    }),
}).min(1);

export const getTaskQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).optional().default(1),
});
