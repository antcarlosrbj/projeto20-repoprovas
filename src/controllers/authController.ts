import { Request, Response } from "express";
import * as authService from "../services/authService.js";
import { UserSignUp, UserSignIn } from "./../schemas/authSchema.js";


export async function signUpPOST(req: Request, res: Response) {
  const user: UserSignUp = req.body;

  const validateUserSignUp = await authService.validateUserSignUp(user);
  if (!validateUserSignUp.res) {
    res.status(401).send(validateUserSignUp.text);
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

export async function signInPOST(req: Request, res: Response) {
  const user: UserSignIn = req.body;

  const validateUserSignIn = await authService.validateUserSignIn(user);
  if (!validateUserSignIn.res) {
    res.status(401).send(validateUserSignIn.text);
    return;
  }

  const authenticateLogin = await authService.authenticateLogin(user);
  if (!authenticateLogin.res) {
    res.status(401).send(authenticateLogin.text);
    return;
  }

  const token = await authService.sendToken(user);

  res.status(200).send(token);
}