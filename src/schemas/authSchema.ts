import Joi from "joi";

export const userSignUp = Joi.object<user>({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(8),
  passwordConfirmation: Joi.string().required().min(8),
});

export type user = {
  email: string
  password: string
  passwordConfirmation: string
}