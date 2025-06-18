import {Schema, model}from "mongoose";
import normalize from "normalize-mongoose"
import { maintenanceSchema } from "../schemas/maintenace.schema";

const maintenanceRequestSchema = new Schema({
  tenantId: {
    type: Number,
    ref: "Tenant",
    required: true,
  },
  unitId: {
    type: Number,
    ref: "Unit",
    required: true,
  },
  category: {
    type: String,
    enum: ["Plumbing", "Electrical", "Cleaning", "Appliance", "Other"],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String, 
  },
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Resolved"],
    default: "Pending",
  },
}, { timestamps: true });

maintenanceSchema.plugin(normalize)
export const MaintenanceRequest = mongoose.model("MaintenanceRequest", maintenanceRequestSchema);
