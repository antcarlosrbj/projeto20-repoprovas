import { Router } from "express";
import { testAddPOST, testListDisciplineGET } from "../controllers/testsController.js";
import { validateToken } from "./../middlewares/authMiddleware.js";

const testsRouter = Router();

testsRouter.post("/test/add", validateToken, testAddPOST);
testsRouter.get("/test/list/discipline", validateToken, testListDisciplineGET);

export default testsRouter;