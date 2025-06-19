import { Router } from "express";
//import { upload } from "../middlewares/maintenance_middleware.js";
import { createMaintenanceRequest, getAllMaintenanceRequests, updateMaintenanceStatus, getTenantMaintenanceRequests } from "../controllers/maintenance_controllers.js";
import { authenticate } from '../middlewares/auth.js';


export const maintenanceRouter = Router()

// Tenant creates a maintenance request
maintenanceRouter.post("/",  authenticate, createMaintenanceRequest);

//Tenant view their requests
maintenanceRouter.get(
    "/my-requests",authenticate, getTenantMaintenanceRequests
);

// Admin views all maintenance requests
maintenanceRouter.get("/", authenticate, getAllMaintenanceRequests);

// Admin updates the status of a request
maintenanceRouter.put("/:id/status", authenticate, updateMaintenanceStatus);

