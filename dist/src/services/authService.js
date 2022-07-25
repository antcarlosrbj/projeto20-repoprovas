var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as usersRepository from "../repositories/usersRepository.js";
import { userSignUp, userSignIn } from "../schemas/authSchema.js";
export function validateUserSignUp(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const validation = userSignUp.validate(user);
        if (validation.error) {
            return { res: false, text: validation.error.details[0].message };
        }
        if (user.password !== user.passwordConfirmation) {
            return { res: false, text: "Password and password confirmation are different" };
        }
        return { res: true };
    });
}
export function validateUserSignIn(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const validation = userSignIn.validate(user);
        if (validation.error) {
            return { res: false, text: validation.error.details[0].message };
        }
        return { res: true };
    });
}
export function duplicateUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const duplicateUser = yield usersRepository.findByEmail(user.email);
        if (duplicateUser) {
            return { res: false, text: "Email has been already registered" };
        }
        return { res: true };
    });
}
export function insertIntoDatabase(user) {
    return __awaiter(this, void 0, void 0, function* () {
        user.password = bcrypt.hashSync(user.password, 10);
        yield usersRepository.insert(user);
        return { res: true };
    });
}
export function authenticateLogin(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const userDatabase = yield usersRepository.findByEmail(user.email);
        if (!userDatabase) {
            return { res: false, text: "Email not found" };
        }
        if (!bcrypt.compareSync(user.password, userDatabase.password)) {
            return { res: false, text: "Invalid password" };
        }
        return { res: true };
    });
}
export function sendToken(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = jwt.sign({
            email: user.email
        }, process.env.JWT_SECRET, { expiresIn: 24 * 60 * 60 });
        return token;
    });
}
export function validateToken(token) {
    return __awaiter(this, void 0, void 0, function* () {
        let answer = { res: true, text: "", userId: 0 };
        let email = "";
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                answer = { res: false, text: err.message, userId: 0 };
            }
            else {
                email = JSON.parse(JSON.stringify(decoded)).email;
            }
        });
        if (!answer.res) {
            return answer;
        }
        if (email) {
            const userDatabase = yield usersRepository.findByEmail(email);
            if (!userDatabase) {
                return { res: false, text: "Email not found", userId: 0 };
            }
            return { res: true, userId: userDatabase.id, text: "" };
        }
        return { res: false, text: "Malformed token", userId: 0 };
    });
}
