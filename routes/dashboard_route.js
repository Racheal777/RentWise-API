import express from 'express';
import { getDashboardSummary } from '../controllers/dashboard_controller.js'; // Import the controller function

export const dashboardRouter = express.Router();

// Route for fetching dashboard summary
dashboardRouter.get('/summary', getDashboardSummary);

// export default dashboardRouter;