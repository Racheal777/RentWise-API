// import Joi from "joi";
// import mongoose from "mongoose";

// export const paymentSchema = Joi.object({
//   tenantId: Joi.string()
//     .custom((value, helpers) => {
//       return mongoose.Types.ObjectId.isValid(value)
//         ? value
//         : helpers.message("Invalid tenantId");
//     })
//     .required(),

//   unitId: Joi.string()
//     .custom((value, helpers) => {
//       return mongoose.Types.ObjectId.isValid(value)
//         ? value
//         : helpers.message("Invalid unitId");
//     })
//     .required(),



//   amount: Joi.number().positive().required(),

//   amountPaid: Joi.number().min(0).default(0),

//   month: Joi.string()
//     .pattern(/^\d{4}-\d{2}$/)
//     .required()
//     .messages({
//       "string.pattern.base": "Month must be in YYYY-MM format",
//     }),

//   status: Joi.string()
//     .valid("paid", "unpaid", "partial")
//     .default("unpaid"),

//   paidAt: Joi.date().optional()
// });


import Joi from "joi";
import mongoose from "mongoose";

export const paymentSchema = Joi.object({
  tenantId: Joi.string()
    .custom((value, helpers) =>
      mongoose.Types.ObjectId.isValid(value)
        ? value
        : helpers.message("Invalid tenantId")
    )
    .required(),

  unitId: Joi.string()
    .custom((value, helpers) =>
      mongoose.Types.ObjectId.isValid(value)
        ? value
        : helpers.message("Invalid unitId")
    )
    .required(),

  expectedAmount: Joi.number().positive().required(),  // Must be a positive number
  amountPaid: Joi.number().min(0).required(),          // Can be 0 or more

  month: Joi.string()
    .pattern(/^\d{4}-\d{2}$/)
    .required()
    .messages({
      "string.pattern.base": "Month must be in YYYY-MM format",
    }),

  status: Joi.string()
    .valid("paid", "unpaid", "partial")
    .default("unpaid"),

  paidAt: Joi.date().optional()
});
