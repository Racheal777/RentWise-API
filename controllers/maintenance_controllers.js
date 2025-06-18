import MaintenanceRequest from "../models/maintenance.model.js";
import { maintenanceSchema } from "../schemas/maintenance.schema.js";

// Create a maintenance request
export const createMaintenanceRequest = async (req, res) => {
    const { error, value } = maintenanceSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const imageUrl = req.file?.path || null;
    const request = await MaintenanceRequest.create({value, image: imageUrl});
        res.status(201).json(request);
    } catch (error) {
        res.status(500).json({ error: "Server Error/Upload failed", details: error.message });
    }
};

// Get all maintenance requests (admin)
export const getAllMaintenanceRequests = async (req, res) => {
    try {
        const requests = await MaintenanceRequest.find();
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch requests" });
    }
};

// Update request status
export const updateMaintenanceStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!["Pending", "In Progress", "Resolved"].includes(status)) {
        return res.status(400).json({ error: "Invalid status value" });
    }

    try {
        const updated = await MaintenanceRequest.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({ error: "Request not found" });
        }

        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ error: "Failed to update status" });
    }
};
