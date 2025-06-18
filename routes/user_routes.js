import { Router } from "express";
import { loginUser, signUp } from "../controllers/user_controller.js";
// import { secureRoute } from "../middlewares/auth.js";

export const userRouter = Router();

// userRouter.post('/auth/signup',secureRoute('signUp',signUp));
// since this is opened to anyone secureroute is not required here.

userRouter.post('/auth/signup',signUp);

// userRouter.post('/auth/login',secureRoute('loginUser',loginUser));- since this is opened to anyone secureroute is not required here.

userRouter.post('/auth/login',loginUser);
