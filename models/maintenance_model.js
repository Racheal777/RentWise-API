import { Schema, model } from "mongoose";
import normalize from "normalize-mongoose"
import { maintenanceSchema } from "../schemas/maintenace.schema.js";


const maintenanceRequestSchema = new Schema({
  tenantId: {
    type: Schema.Types.ObjectId,
    ref: "Tenant",
  
  },
  unitId: {
    type: Schema.Types.ObjectId,
    ref: "Unit",
   
  },
  category: {
    type: String,
    enum: ["Plumbing", "Electrical", "Cleaning", "Appliance", "General", "Other"],
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
  role: {
    type: String,
    enum: ["tenant", "admin"],
    default: "tenant"
  }
}, { timestamps: true });

maintenanceRequestSchema.plugin(normalize)
export const MaintenanceRequest = model("MaintenanceRequest", maintenanceRequestSchema);
