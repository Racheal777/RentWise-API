import express from 'express';
import { notifyRentDue } from '../controllers/notification_controller.js';

const rentRoute = express.Router();

// Manual trigger route
rentRoute.get('/notify/rent-due', notifyRentDue);

export default rentRoute;
