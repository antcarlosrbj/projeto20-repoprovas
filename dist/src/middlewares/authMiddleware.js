var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as authService from "./../services/authService.js";
export function validateToken(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { authorization } = req.headers;
        if (!authorization) {
            return res.status(401).send("Token is required");
        }
        const [, token] = authorization.split(" ");
        if (!token) {
            return res.status(401).send("Token is required");
        }
        const validateToken = yield authService.validateToken(token);
        if (!validateToken.res) {
            return res.status(401).send("Token is invalid");
        }
        res.locals.userId = validateToken.userId;
        next();
    });
}
