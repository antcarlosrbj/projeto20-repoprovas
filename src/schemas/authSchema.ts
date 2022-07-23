import Joi from "joi";

export const userSignUp = Joi.object<UserSignUp>({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(8),
  passwordConfirmation: Joi.string().required().min(8),
});

export const userSignIn = Joi.object<UserSignIn>({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(8)
});

export type UserSignUp = {
  email: string
  password: string
  passwordConfirmation: string
};

export type UserSignIn = Omit<UserSignUp, "passwordConfirmation">;