import { Router } from "express";

import { getTenants, assignUnit } from "../controllers/tenantAssignment_controller.js";
import { authenticate, hasPermission } from "../middlewares/auth.js";

export const assignmentRouter = Router();

assignmentRouter.get('/',authenticate, hasPermission("viewTenants"), getTenants);
assignmentRouter.post('/assign', authenticate, assignUnit);