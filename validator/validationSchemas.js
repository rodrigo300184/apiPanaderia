import Joi from "joi";

export const productSchema = Joi.object({
    "title":Joi.string().min(1).max(255),
    "description":Joi.string().min(3).max(255),
    "stock": Joi.boolean(),
    "creation_date": Joi.date(),
});

export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
	password: Joi.string().min(3).max(10),

});