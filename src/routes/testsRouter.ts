import { Router } from "express";
import { testAddPOST } from "../controllers/testsController.js";
import { validateToken } from "./../middlewares/authMiddleware.js";

const testsRouter = Router();

testsRouter.post("/test/add", validateToken, testAddPOST);

export default testsRouter;