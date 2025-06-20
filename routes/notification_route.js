import express from 'express';
import notifyRentDue  from '../controllers/notification_controller.js';

const notificationRoute = express.Router();

// Manual trigger route
rentRoute.get('/notify/rent-due', notifyRentDue);

export default notificationRoute;
