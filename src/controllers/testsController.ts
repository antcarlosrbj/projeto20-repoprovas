import { Request, Response } from "express";
import * as testsService from "../services/testsService.js";
import { TestAdd } from "../schemas/testsSchema.js";


export async function testAddPOST(req: Request, res: Response) {
  const test: TestAdd = req.body;
  const userId: number = res.locals.userId;

  const validateTestAdd = await testsService.validateTestAdd(test);
  if (!validateTestAdd.res) {
    res.status(401).send(validateTestAdd.text);
    return;
  }

  const insertIntoDatabase = await testsService.insertIntoDatabase(test, userId);
  if (!insertIntoDatabase.res) {
    res.status(401).send(insertIntoDatabase.text);
    return;
  }

  res.sendStatus(201);
}

export async function testListDisciplineGET(req: Request, res: Response) {

  
  const testListDiscipline = await testsService.testListDiscipline();
  if (!testListDiscipline) {
    res.status(404);
    return;
  }

  res.send(testListDiscipline);
}