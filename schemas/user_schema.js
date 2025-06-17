import Joi from "joi";

export const userSchema = Joi.object({
    firstName: Joi.string().min(3).max(30).required(),
    lastName: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(1024).required(),
    role: Joi.string().valid('admin', 'tenant').default('tenant')
})