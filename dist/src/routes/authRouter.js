import { Router } from "express";
import { signUpPOST, signInPOST } from "../controllers/authController.js";
const authRouter = Router();
authRouter.post("/sign-up", signUpPOST);
authRouter.post("/sign-in", signInPOST);
export default authRouter;
