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
import { prisma } from "../src/config/database.js";
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const hashedPassword = bcrypt.hashSync("12345678", 10);
        yield prisma.tests.deleteMany();
        yield prisma.categories.deleteMany();
        yield prisma.teachersDisciplines.deleteMany();
        yield prisma.disciplines.deleteMany();
        yield prisma.teachers.deleteMany();
        yield prisma.terms.deleteMany();
        yield prisma.users.deleteMany();
        yield prisma.users.create({
            data: {
                id: 1,
                email: 'antonio@antonio.com',
                password: hashedPassword
            }
        });
        yield prisma.terms.createMany({
            data: [
                { id: 1, number: 1 },
                { id: 2, number: 2 },
                { id: 3, number: 3 },
                { id: 4, number: 4 },
                { id: 5, number: 5 },
                { id: 6, number: 6 },
            ],
            skipDuplicates: true,
        });
        yield prisma.categories.createMany({
            data: [
                { id: 1, name: 'Projeto' },
                { id: 2, name: 'Prática' },
                { id: 3, name: 'Recuperação' },
            ],
            skipDuplicates: true,
        });
        yield prisma.teachers.createMany({
            data: [
                { id: 1, name: 'Diego Pinho' },
                { id: 2, name: 'Bruna Hamori' },
            ],
            skipDuplicates: true,
        });
        yield prisma.disciplines.createMany({
            data: [
                { id: 1, name: 'HTML e CSS', termId: 1 },
                { id: 2, name: 'JavaScript', termId: 2 },
                { id: 3, name: 'React', termId: 3 },
                { id: 4, name: 'Humildade', termId: 1 },
                { id: 5, name: 'Planejamento', termId: 2 },
                { id: 6, name: 'Autoconfiança', termId: 3 },
            ],
            skipDuplicates: true,
        });
        yield prisma.teachersDisciplines.createMany({
            data: [
                { id: 1, teacherId: 1, disciplinesId: 1 },
                { id: 2, teacherId: 1, disciplinesId: 2 },
                { id: 3, teacherId: 1, disciplinesId: 3 },
                { id: 4, teacherId: 2, disciplinesId: 4 },
                { id: 5, teacherId: 2, disciplinesId: 5 },
                { id: 6, teacherId: 2, disciplinesId: 6 },
            ],
            skipDuplicates: true,
        });
        yield prisma.$queryRaw `SELECT pg_catalog.setval('public.categories_id_seq', 3, true)`;
        yield prisma.$queryRaw `SELECT pg_catalog.setval('public.disciplines_id_seq', 6, true)`;
        yield prisma.$queryRaw `SELECT pg_catalog.setval('public."teachersDisciplines_id_seq"', 6, true)`;
        yield prisma.$queryRaw `SELECT pg_catalog.setval('public.teachers_id_seq', 2, true)`;
        yield prisma.$queryRaw `SELECT pg_catalog.setval('public.terms_id_seq', 6, true)`;
        yield prisma.$queryRaw `SELECT pg_catalog.setval('public.tests_id_seq', 1, false)`;
        yield prisma.$queryRaw `SELECT pg_catalog.setval('public.users_id_seq', 1, true)`;
    });
}
main().catch(e => {
    console.log(e);
    process.exit(1);
}).finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
