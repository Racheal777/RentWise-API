// controllers/maintenanceNotificationController.js

import { MaintenanceRequest } from "../models/Maintenance_model.js";
import { Tenant } from "../models/tenant_model.js";
import { Unit } from "../models/unit_models.js";

const sendMaintenanceNotifications = async (req, res) => {
  try {
    // Get all maintenance requests and populate related tenant and unit data
    const requests = await MaintenanceRequest.find()
    // Populate with full tenant data
      .populate("tenantId")
      // Populate with full unit data 
      .populate("unitId");  

    if (requests.length === 0) {
      return res.status(200).json({ message: "No maintenance requests found." });
    }

    requests.forEach((request) => {
      const tenant = request.tenantId;
      const unit = request.unitId;

      const tenantName = tenant?.fullName || "Tenant";
      const tenantEmail = tenant?.email || "N/A";
      const unitNumber = unit?.unitNumber ?? "Unknown Unit";

      console.log(`[Maintenance Notification] 
        Hello ${tenantName}, 
        There is a ${request.category.toLowerCase()} maintenance request for your unit ${unitNumber}.
        Description: ${request.description}
        Status: ${request.status}
        Email: ${tenantEmail}
        `);
    });

    res.status(200).json({ message: "Maintenance notifications sent (console log)." });
  } catch (error) {
    console.error("Error sending maintenance notifications:", error);
    res.status(500).json({ error: "Failed to send maintenance notifications." });
  }
};
export default sendMaintenanceNotifications;
