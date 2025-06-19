// import { Schema,model, plugin, mongoose} from "mongoose";
// import normalize from "normalize-mongoose";

// const paymentSchema = new Schema({
//   tenantId: { type: mongoose.Schema.Types.ObjectId, ref: "Tenant", required: true },

//   unitId: { type: mongoose.Schema.Types.ObjectId, ref: "Unit", required: true },
  

//   amount: { type: Number, required: true },
//   amountPaid: { type: Number, default: 0 },                              

//   month: { type: String, required: true }, // e.g., "2025-06"

//   status: { type: String, enum: ["paid", "unpaid", "partial"], default: "unpaid" },

//   paidAt: { type: Date }

// }, { timestamps: true })

// paymentSchema.plugin(normalize);

// export const Payment = model('Payment', paymentSchema);


import { Schema, model, mongoose } from "mongoose";
import normalize from "normalize-mongoose";

const paymentSchema = new Schema({
  tenantId: { type: mongoose.Schema.Types.ObjectId, ref: "Tenant", required: true },
  unitId: { type: mongoose.Schema.Types.ObjectId, ref: "Unit", required: true },

  expectedAmount: { type: Number, required: true },   // Full rent expected
  amountPaid: { type: Number, default: 0 },           // Actual amount paid

  month: { type: String, required: true },            // Format: YYYY-MM
  referenceId: { type: String },
  status: { type: String, enum: ["paid", "unpaid", "partial"], default: "unpaid" },
  paidAt: { type: Date }

}, { timestamps: true });

paymentSchema.plugin(normalize);

export const Payment = model('Payment', paymentSchema);
