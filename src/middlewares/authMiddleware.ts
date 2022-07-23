import { NextFunction, Request, Response } from "express";
import * as authService from "./../services/authService.js";

export async function validateToken(req: Request, res: Response, next: NextFunction) {
  
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).send("Token is required");
  }

  const [, token] = authorization.split(" ");
  if (!token) {
    return res.status(401).send("Token is required");
  }

  const validateToken = await authService.validateToken(token);
  if (!validateToken.res) {
    return res.status(401).send("Token is invalid");
  }
  
  res.locals.userId = validateToken.userId;

  next();
}
