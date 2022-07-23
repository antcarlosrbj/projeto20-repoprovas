import { Router } from "express";
import {signUpPOST} from "../controllers/authController.js";

const authRouter = Router();

authRouter.post("/sign-up", signUpPOST);

export default authRouter;