import { Router } from "express";
import { upload } from "../middlewares/maintenance_middleware.js";
import { createMaintenanceRequest, getAllMaintenanceRequests, updateMaintenanceStatus, getTenantMaintenanceRequests } from "../controllers/maintenance_controllers.js";
import { authenticate } from '../middlewares/auth.js';


export const maintenanceRouter = Router()

// Tenant creates a maintenance request
maintenanceRouter.post("/maintenance", upload.array("images", 5), authenticate, createMaintenanceRequest);

//Tenant view their requests
maintenanceRouter.get(
    "/maintenance/my-requests",authenticate, getTenantMaintenanceRequests
);

// Admin views all maintenance requests
maintenanceRouter.get("/maintenance", authenticate, getAllMaintenanceRequests);

// Admin updates the status of a request
maintenanceRouter.put("/maintenance/:id/status", authenticate, updateMaintenanceStatus);

