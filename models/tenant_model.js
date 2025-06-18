import { Schema, model } from "mongoose";
import normalize from "normalize-mongoose"

const tenantSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },

    email: String,

    propertyId: {
        type: String,
        required: true
    },

    unitNumber: {
        type: Number,
        required: true
    },

    startDate: {
        type: String,
        required: true
    },

    endDate: {
        type: String,
        required: true
    },
});

tenantSchema.plugin(normalize);

export const Tenant = model('Tenant', tenantSchema);