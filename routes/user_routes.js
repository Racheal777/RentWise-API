import { Router } from "express";
import { loginUser, signUp } from "../controllers/user_controller.js";

export const userRouter = Router();

userRouter.post('/auth/signup',signUp);

userRouter.post('/auth/login',loginUser);
