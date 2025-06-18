import { Router } from "express";

import { getTenants, assignUnit } from "../controllers/tenantAssignment_controller.js";

export const assignmentRouter = Router();

assignmentRouter.get('/', getTenants);
assignmentRouter.post('/assign', assignUnit);