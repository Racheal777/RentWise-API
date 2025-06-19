import { Router } from "express";
import {
  createProperty,
  getAllProperties,
  getPropertyById,
  patchProperty,
  getMyProperties,
  deleteMyProperty,
} from "../controllers/property_controller.js";
import { authenticate, hasPermission } from "../middlewares/auth.js";
import { upload } from "../middlewares/image_upload.js";
import { checkPermission } from "../utils/roles.js";

export const PropertyRouter = Router();

PropertyRouter.post("/", authenticate, hasPermission("createPrope"), upload.single("image"), createProperty);
PropertyRouter.get("/", getAllProperties);
PropertyRouter.get("/my/properties", authenticate, getMyProperties);
PropertyRouter.get("/:id", getPropertyById);
PropertyRouter.patch("/:id", patchProperty);
PropertyRouter.delete("/:id", authenticate, deleteMyProperty);
