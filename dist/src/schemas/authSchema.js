import Joi from "joi";
export const userSignUp = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8),
    passwordConfirmation: Joi.string().required().min(8),
});
export const userSignIn = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8)
});
