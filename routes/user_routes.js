import { Router } from "express";
import { loginUser, signUp } from "../controllers/user_controller.js";
import { authenticate } from "../middlewares/auth.js";

export const userRouter = Router();

userRouter.post('/auth',signUp,authenticate);

userRouter.get('/auth',loginUser,authenticate);
