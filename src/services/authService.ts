import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as usersRepository from "../repositories/usersRepository.js";
import { UserSignUp, userSignUp, UserSignIn, userSignIn } from "../schemas/authSchema.js";


export async function validateUserSignUp(user: UserSignUp) {

    const validation = userSignUp.validate(user);
    if (validation.error) {
      return {res: false, text: validation.error.details[0].message};
    }

    if (user.password !== user.passwordConfirmation) {
        return {res: false, text: "Password and password confirmation are different"};
    }

    return {res: true}
}

export async function validateUserSignIn(user: UserSignIn) {

    const validation = userSignIn.validate(user);
    if (validation.error) {
      return {res: false, text: validation.error.details[0].message};
    }

    return {res: true}
}

export async function duplicateUser(user: UserSignUp) {

    const duplicateUser = await usersRepository.findByEmail(user.email)
    if (duplicateUser) {
        return {res: false, text: "Email has been already registered"};
    }

    return {res: true}
}

export async function insertIntoDatabase(user: UserSignUp) {

    user.password = bcrypt.hashSync(user.password, 10)  
    await usersRepository.insert(user);

    return {res: true}
}

export async function authenticateLogin(user: UserSignIn) {

    const userDatabase = await usersRepository.findByEmail(user.email)
    if (!userDatabase) {
        return {res: false, text: "Email not found"}
    }

    if (!bcrypt.compareSync(user.password, userDatabase.password)) {
        return {res: false, text: "Invalid password"}
    }

    return {res: true};
    
}

export async function sendToken(user: UserSignIn) {

    const token = jwt.sign({
        email: user.email
      }, process.env.JWT_SECRET, { expiresIn: 24 * 60 * 60 });
    
    
    return token;

}

export async function validateToken(token: string) {

    let answer = {res: true, text: "", userId: 0};
    let email = "";

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            answer = {res: false, text: err.message, userId: 0}
        } else {
            email = JSON.parse(JSON.stringify(decoded)).email;
        }
    });

    if (!answer.res) {
        return answer;
    }

    if (email) {
        const userDatabase = await usersRepository.findByEmail(email)
        if (!userDatabase) {
            return {res: false, text: "Email not found", userId: 0}
        }
        return {res: true, userId: userDatabase.id, text: ""};
    }
    
    return {res: false, text: "Malformed token", userId: 0};
    
}