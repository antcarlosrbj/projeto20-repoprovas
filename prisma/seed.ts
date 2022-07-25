import bcrypt from "bcrypt";
import { prisma } from "../src/config/database.js";

async function main() {
    const hashedPassword = bcrypt.hashSync("12345678", 10);

    await prisma.tests.deleteMany();
    await prisma.categories.deleteMany();
    await prisma.teachersDisciplines.deleteMany();
    await prisma.disciplines.deleteMany();
    await prisma.teachers.deleteMany();
    await prisma.terms.deleteMany();
    await prisma.users.deleteMany();

    await prisma.users.create({
        data: {
            id: 1,
            email: 'antonio@antonio.com',
            password: hashedPassword
        }
    });

    await prisma.terms.createMany({
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

    await prisma.categories.createMany({
        data: [
            { id: 1, name: 'Projeto' },
            { id: 2, name: 'Prática' },
            { id: 3, name: 'Recuperação' },
        ],
        skipDuplicates: true,
    });

    await prisma.teachers.createMany({
        data: [
            { id: 1, name: 'Diego Pinho' },
            { id: 2, name: 'Bruna Hamori' },
        ],
        skipDuplicates: true,
    });

    await prisma.disciplines.createMany({
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

    await prisma.teachersDisciplines.createMany({
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

    await prisma.$queryRaw`SELECT pg_catalog.setval('public.categories_id_seq', 3, true)`;
    await prisma.$queryRaw`SELECT pg_catalog.setval('public.disciplines_id_seq', 6, true)`;
    await prisma.$queryRaw`SELECT pg_catalog.setval('public."teachersDisciplines_id_seq"', 6, true)`;
    await prisma.$queryRaw`SELECT pg_catalog.setval('public.teachers_id_seq', 2, true)`;
    await prisma.$queryRaw`SELECT pg_catalog.setval('public.terms_id_seq', 6, true)`;
    await prisma.$queryRaw`SELECT pg_catalog.setval('public.tests_id_seq', 1, false)`;
    await prisma.$queryRaw`SELECT pg_catalog.setval('public.users_id_seq', 1, true)`;
}

main().catch(e => {
  console.log(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
})