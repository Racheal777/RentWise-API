import { Router } from "express";
import { postUnit, getUnit, getUnitById } from "../controllers/unit_controllers.js";
import { authenticate, hasPermission } from "../middlewares/auth.js";

export const unitRouter = Router()


unitRouter.post('/', authenticate, hasPermission("postUnit"), postUnit)

unitRouter.get('/', getUnit)

unitRouter.get('/:id', getUnitById)