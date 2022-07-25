var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as authService from "../services/authService.js";
export function signUpPOST(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = req.body;
        const validateUserSignUp = yield authService.validateUserSignUp(user);
        if (!validateUserSignUp.res) {
            res.status(401).send(validateUserSignUp.text);
            return;
        }
        const duplicateUser = yield authService.duplicateUser(user);
        if (!duplicateUser.res) {
            res.status(401).send(duplicateUser.text);
            return;
        }
        yield authService.insertIntoDatabase(user);
        res.sendStatus(201);
    });
}
export function signInPOST(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = req.body;
        const validateUserSignIn = yield authService.validateUserSignIn(user);
        if (!validateUserSignIn.res) {
            res.status(401).send(validateUserSignIn.text);
            return;
        }
        const authenticateLogin = yield authService.authenticateLogin(user);
        if (!authenticateLogin.res) {
            res.status(401).send(authenticateLogin.text);
            return;
        }
        const token = yield authService.sendToken(user);
        res.status(200).send(token);
    });
}
