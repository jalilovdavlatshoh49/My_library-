import Joi from "joi";

export const bookCreateSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  year: Joi.number().integer().min(0),
  genre: Joi.array().items(Joi.string()),
  description: Joi.string().allow(''),
});

export const bookUpdateSchema = Joi.object({
  title: Joi.string(),
  author: Joi.string(),
  year: Joi.number().integer().min(0),
  genre: Joi.array().items(Joi.string()),
  description: Joi.string().allow(''),
});