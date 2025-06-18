import Joi from "joi";

export const unitSchema = Joi.object({

     propertyId: Joi.string() 
    .required()
    .messages({
      'any.required': 'Property ID is required.',
      'string.empty': 'Property ID cannot be empty.',
    }),
  unitNumber: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      'any.required': 'Unit number is required.',
      'number.base': 'Unit number must be a number.',
      'number.integer': 'Unit number must be an integer.',
      'number.positive': 'Unit number must be a positive number.',
    }),
  rentAmount: Joi.number()
    .positive()
    .required()
    .messages({
      'any.required': 'Rent amount is required.',
      'number.base': 'Rent amount must be a number.',
      'number.positive': 'Rent amount must be a positive number.',
    }),
  status: Joi.string()
    .valid('available', 'occupied', 'maintenance')
    .default('available')
    .messages({
      'any.only': 'Status must be one of "available", "occupied", or "maintenance".',
    }),
  tenantId: Joi.string() 
    .allow(null) 
    .messages({
      'string.empty': 'Tenant ID cannot be empty if provided.',
    }),

})

