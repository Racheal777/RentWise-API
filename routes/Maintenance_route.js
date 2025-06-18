import express from 'express'
import sendMaintenanceNotifications from '../controllers/Note_Maintenance_Con.js';
 
const maintenanceRoute = express.Router();

maintenanceRoute.get('/notify/maintenance', sendMaintenanceNotifications)

export default maintenanceRoute;