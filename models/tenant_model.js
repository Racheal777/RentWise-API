import { Schema, model } from "mongoose";
import normalize from "normalize-mongoose"

const tenantSchema = new Schema({
    tenantId: {
        type: Schema.Types.ObjectId, ref: "User"
    },

    unitId: {
        type: Schema.Types.ObjectId, ref: "Unit"
    },

    startDate: {
        type: String,
        required: true
    },

    endDate: {
        type: String,
        required: true
    },

    amount: {
        type: Number
    },
    paymentStatus:{
        type: String,
        default: "pending"

    }
});

tenantSchema.plugin(normalize);

export const Tenant = model('Tenant', tenantSchema);