import supertest from "supertest";
import jwt from "jsonwebtoken";
import app from "./../src/app.js";
import {prisma} from "./../src/config/database.js";

const EMAIL = `antonio@antonio.com`;
const PASSWORD = "12345678";
const signUp = { email: EMAIL, password: PASSWORD, passwordConfirmation: PASSWORD };
const login = { email: EMAIL, password: PASSWORD };

describe("User tests suite", () => {
    it("given email and password, create user", async () => {

        await prisma.$executeRaw`DELETE FROM users WHERE email = 'antonio@antonio.com'`

        const response = await supertest(app).post(`/sign-up`).send(signUp);
        expect(response.statusCode).toBe(201);

        const user = await prisma.users.findFirst({
            where: { email: 'antonio@antonio.com' }
        });
        expect(user.email).toBe('antonio@antonio.com');

    });

    it("given email already registered, try to register again", async () => {

        await prisma.$executeRaw`DELETE FROM users WHERE email = 'antonio@antonio.com'`

        const response = await supertest(app).post(`/sign-up`).send(signUp);
        expect(response.statusCode).toBe(201);

        const user = await prisma.users.findFirst({
            where: { email: 'antonio@antonio.com' }
        });
        expect(user.email).toBe('antonio@antonio.com');

        const secondResponse = await supertest(app).post(`/sign-up`).send(signUp);
        expect(secondResponse.statusCode).toBe(401);
    });

    it("given email and password, login", async () => {

        await prisma.$executeRaw`DELETE FROM users WHERE email = 'antonio@antonio.com'`

        const response = await supertest(app).post(`/sign-up`).send(signUp);
        expect(response.statusCode).toBe(201);

        const user = await prisma.users.findFirst({
            where: { email: 'antonio@antonio.com' }
        });
        expect(user.email).toBe('antonio@antonio.com');

        const responseLogin = await supertest(app).post(`/sign-in`).send(login);
        expect(responseLogin.statusCode).toBe(200);
        expect(responseLogin.body).not.toBeNull();
    });

    it("given email not registered, login", async () => {

        await prisma.$executeRaw`DELETE FROM users WHERE email = 'carlos@carlos.com'`
        login.email = 'carlos@carlos.com';

        const responseLogin = await supertest(app).post(`/sign-in`).send(login);
        expect(responseLogin.statusCode).toBe(401);
    });

    it("add test", async () => {

        await prisma.$executeRaw`DELETE FROM users WHERE email = 'antonio@antonio.com'`

        const responseSignUp = await supertest(app).post(`/sign-up`).send(signUp);
        expect(responseSignUp.statusCode).toBe(201);

        await prisma.$executeRaw`DELETE FROM tests WHERE name = 'Boas Praticas'`

        const token = jwt.sign({
            email: signUp.email
        }, process.env.JWT_SECRET);

        const response = await supertest(app).post(`/test/add`).set('Authorization', 'Bearer ' + token).send({
            "name": "Boas Praticas",
            "pdfUrl": "http://www.google.com/search?q=boas+praticas",
            "categoryId": 2,
            "disciplineId": 2,
            "teacherId": 1
        });
        expect(response.statusCode).toBe(201);
    });

    it("list tests by discipline", async () => {

        const token = jwt.sign({
            email: signUp.email
        }, process.env.JWT_SECRET);

        const response = await supertest(app).get(`/test/list/discipline`).set('Authorization', 'Bearer ' + token);
        expect(response.statusCode).toBe(200);
        expect(response.body).not.toBeNull();
    });

    it("list tests by teacher", async () => {

        const token = jwt.sign({
            email: signUp.email
        }, process.env.JWT_SECRET);

        const response = await supertest(app).get(`/test/list/teacher`).set('Authorization', 'Bearer ' + token);
        expect(response.statusCode).toBe(200);
        expect(response.body).not.toBeNull();
    });
})