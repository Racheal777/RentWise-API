import {Router} from "express";
import {upload} from "../middlewares/multer_middleware.js";
import {
    createMaintenanceRequest,
    getAllMaintenanceRequests,
    updateMaintenanceStatus
} from "../controllers/maintenance_controllers.js";
import { authenticate } from '../middlewares/auth.js';


export const maintenanceRouter = Router()

// Tenant creates a maintenance request
maintenanceRouter.post("/maintenance", upload.array("images", 5), authenticate, createMaintenanceRequest);

// Admin views all maintenance requests
maintenanceRouter.get("/maintenance", getAllMaintenanceRequests);

// Admin updates the status of a request
maintenanceRouter.put("/maintenance/:id/status", updateMaintenanceStatus);

