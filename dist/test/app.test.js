var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import supertest from "supertest";
import jwt from "jsonwebtoken";
import app from "./../src/app.js";
import { prisma } from "./../src/config/database.js";
const EMAIL = `antonio@antonio.com`;
const PASSWORD = "12345678";
const signUp = { email: EMAIL, password: PASSWORD, passwordConfirmation: PASSWORD };
const login = { email: EMAIL, password: PASSWORD };
describe("User tests suite", () => {
    it("given email and password, create user", () => __awaiter(void 0, void 0, void 0, function* () {
        yield prisma.$executeRaw `DELETE FROM users WHERE email = 'antonio@antonio.com'`;
        const response = yield supertest(app).post(`/sign-up`).send(signUp);
        expect(response.statusCode).toBe(201);
        const user = yield prisma.users.findFirst({
            where: { email: 'antonio@antonio.com' }
        });
        expect(user.email).toBe('antonio@antonio.com');
    }));
    it("given email already registered, try to register again", () => __awaiter(void 0, void 0, void 0, function* () {
        yield prisma.$executeRaw `DELETE FROM users WHERE email = 'antonio@antonio.com'`;
        const response = yield supertest(app).post(`/sign-up`).send(signUp);
        expect(response.statusCode).toBe(201);
        const user = yield prisma.users.findFirst({
            where: { email: 'antonio@antonio.com' }
        });
        expect(user.email).toBe('antonio@antonio.com');
        const secondResponse = yield supertest(app).post(`/sign-up`).send(signUp);
        expect(secondResponse.statusCode).toBe(401);
    }));
    it("given email and password, login", () => __awaiter(void 0, void 0, void 0, function* () {
        yield prisma.$executeRaw `DELETE FROM users WHERE email = 'antonio@antonio.com'`;
        const response = yield supertest(app).post(`/sign-up`).send(signUp);
        expect(response.statusCode).toBe(201);
        const user = yield prisma.users.findFirst({
            where: { email: 'antonio@antonio.com' }
        });
        expect(user.email).toBe('antonio@antonio.com');
        const responseLogin = yield supertest(app).post(`/sign-in`).send(login);
        expect(responseLogin.statusCode).toBe(200);
        expect(responseLogin.body).not.toBeNull();
    }));
    it("given email not registered, login", () => __awaiter(void 0, void 0, void 0, function* () {
        yield prisma.$executeRaw `DELETE FROM users WHERE email = 'carlos@carlos.com'`;
        login.email = 'carlos@carlos.com';
        const responseLogin = yield supertest(app).post(`/sign-in`).send(login);
        expect(responseLogin.statusCode).toBe(401);
    }));
    it("add test", () => __awaiter(void 0, void 0, void 0, function* () {
        yield prisma.$executeRaw `DELETE FROM users WHERE email = 'antonio@antonio.com'`;
        const responseSignUp = yield supertest(app).post(`/sign-up`).send(signUp);
        expect(responseSignUp.statusCode).toBe(201);
        yield prisma.$executeRaw `DELETE FROM tests WHERE name = 'Boas Praticas'`;
        const token = jwt.sign({
            email: signUp.email
        }, process.env.JWT_SECRET);
        const response = yield supertest(app).post(`/test/add`).set('Authorization', 'Bearer ' + token).send({
            "name": "Boas Praticas",
            "pdfUrl": "http://www.google.com/search?q=boas+praticas",
            "categoryId": 2,
            "disciplineId": 2,
            "teacherId": 1
        });
        expect(response.statusCode).toBe(201);
    }));
    it("list tests by discipline", () => __awaiter(void 0, void 0, void 0, function* () {
        const token = jwt.sign({
            email: signUp.email
        }, process.env.JWT_SECRET);
        const response = yield supertest(app).get(`/test/list/discipline`).set('Authorization', 'Bearer ' + token);
        expect(response.statusCode).toBe(200);
        expect(response.body).not.toBeNull();
    }));
    it("list tests by teacher", () => __awaiter(void 0, void 0, void 0, function* () {
        const token = jwt.sign({
            email: signUp.email
        }, process.env.JWT_SECRET);
        const response = yield supertest(app).get(`/test/list/teacher`).set('Authorization', 'Bearer ' + token);
        expect(response.statusCode).toBe(200);
        expect(response.body).not.toBeNull();
    }));
});
