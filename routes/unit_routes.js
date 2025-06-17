import { Router } from "express";
import { postUnit, getUnit, getUnitById } from "../controllers/unit_controllers.js";
import { authenticate } from "../middlewares/auth.js";

export const unitRouter = Router()


unitRouter.post('/', authenticate, postUnit)

unitRouter.get('/unit', getUnit)

unitRouter.get('/unit/:id', getUnitById)