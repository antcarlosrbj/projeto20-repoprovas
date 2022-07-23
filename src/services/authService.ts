import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as usersRepository from "../repositories/usersRepository.js";
import { user, userSignUp } from "../schemas/authSchema.js";


export async function validateUser(user: user) {

    const validation = userSignUp.validate(user);
    if (validation.error) {
      return {res: false, text: validation.error.details[0].message};
    }

    if (user.password !== user.passwordConfirmation) {
        return {res: false, text: "Password and password confirmation are different"};
      }

    return {res: true}
}

export async function duplicateUser(user: user) {

    const duplicateUser = await usersRepository.findByEmail(user.email)
    if (duplicateUser) {
        return {res: false, text: "Email has been already registered"};
    }

    return {res: true}
}

export async function insertIntoDatabase(user: user) {

    user.password = bcrypt.hashSync(user.password, 10)  
    await usersRepository.insert(user);

    return {res: true}
}