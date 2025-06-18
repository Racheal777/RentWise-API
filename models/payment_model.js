import { Schema,model, plugin, mongoose} from "mongoose";
import normalize from "normalize-mongoose";

const paymentSchema = new Schema({
  tenantId: { type: mongoose.Schema.Types.ObjectId, ref: "Tenant", required: true },

  unitId: { type: mongoose.Schema.Types.ObjectId, ref: "Unit", required: true },
  referenceId: {type: String},

  amount: { type: Number, required: true },
  amountDue: { type: Number, required: true},
  amountPaid: { type: Number, required: true},

  month: { type: String, required: true }, // e.g., "2025-06"

  status: { type: String, enum: ["paid", "unpaid"], default: "unpaid" },

  paidAt: { type: Date }

}, { timestamps: true })

paymentSchema.plugin(normalize);

export const Payment = model('Payment', paymentSchema);