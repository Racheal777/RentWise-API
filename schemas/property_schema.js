import Joi from "joi";
export const propertiesSchema = Joi.object({
    name: Joi.string().required(),
    address: Joi.string().required(),
    type: Joi.string(),
    description: Joi.string(),
    image: Joi.string()
    
})