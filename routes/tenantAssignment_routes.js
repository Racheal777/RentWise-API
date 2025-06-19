import { Router } from "express";

import { getTenants, assignUnit } from "../controllers/tenantAssignment_controller.js";
import { authenticate } from "../middlewares/auth.js";

export const assignmentRouter = Router();

assignmentRouter.get('/', getTenants);
assignmentRouter.post('/assign', authenticate, assignUnit);