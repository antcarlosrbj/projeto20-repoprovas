import { Request, Response } from "express";
import * as authService from "../services/authService.js";
import {user} from "./../schemas/authSchema.js";


export async function signUpPOST(req: Request, res: Response) {
  const user: user = req.body;

  const validateUser = await authService.validateUser(user);
  if (!validateUser.res) {
    res.status(401).send(validateUser.text);
    return;
  }

  const duplicateUser = await authService.duplicateUser(user);
  if (!duplicateUser.res) {
    res.status(401).send(duplicateUser.text);
    return;
  }

  await authService.insertIntoDatabase(user)

  res.sendStatus(201);
}