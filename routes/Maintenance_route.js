import express from 'express'
import notifyMaintenance from '../controllers/Maintenance_controller';
 
const maintenanceRoute = express.Router();

maintenanceRoute.get('/notify/maintenance', notifyMaintenance)

export default maintenanceRoute;