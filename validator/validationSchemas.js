import Joi from "joi";

export const productSchema = Joi.object({
    "title":Joi.string().min(1).max(255).required(),
    "description":Joi.string().min(30).max(1000).required(),
    "stock": Joi.boolean().required(),
    "creation_date": Joi.date(),
});

export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
	password: Joi.string().min(3).max(10),

});