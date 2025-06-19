import Joi from "joi";

const maintenanceSchema = Joi.object({
  tenantId: Joi.string().required().messages({
    "any.required": "Tenant ID is required"
  }),
  unitId: Joi.string().required().messages({
    "any.required": "Unit ID is required"
  }),
  category: Joi.string().valid("Plumbing", "Electrical", "Cleaning", "General", "Appliance", "Other").required().messages({
    "any.required": "Category is required",
    "any.only": "Invalid category"
  }),
  description: Joi.string().min(5).required().messages({
    "any.required": "Description is required",
    "string.min": "Description must be at least 5 characters"
  }),
  image: Joi.string().uri().optional().messages({
    "string.uri": "Image must be a valid URL"
  }),
  status: Joi.string().valid("Pending", "In Progress", "Resolved").optional().default("Pending").messages({
    "any.only": "Status must be Pending, In Progress, or Resolved"
  })
});

export { maintenanceSchema };
