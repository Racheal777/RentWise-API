import express from 'express'
import notifyMaintenance from '../controllers/Note_Maintenance_Con';
 
const maintenanceRoute = express.Router();

maintenanceRoute.get('/notify/maintenance', notifyMaintenance)

export default maintenanceRoute;