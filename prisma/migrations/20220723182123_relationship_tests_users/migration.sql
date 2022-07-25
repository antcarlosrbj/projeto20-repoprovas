/*
  Warnings:

  - Added the required column `userId` to the `tests` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tests" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "tests" ADD CONSTRAINT "tests_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddDatas

DELETE FROM tests;
DELETE FROM categories;
DELETE FROM "teachersDisciplines";
DELETE FROM disciplines;
DELETE FROM teachers;
DELETE FROM terms;
DELETE FROM users;

INSERT INTO users ("id", "email", "password") VALUES (1, 'antonio@antonio.com', '$2b$10$zVnQxd2.uKbaCvXepcc8e.n6zOrngdZG/PZ/Pdgi/f6jMscSGGq2O');

INSERT INTO terms ("id", "number") VALUES (1, 1);
INSERT INTO terms ("id", "number") VALUES (2, 2);
INSERT INTO terms ("id", "number") VALUES (3, 3);
INSERT INTO terms ("id", "number") VALUES (4, 4);
INSERT INTO terms ("id", "number") VALUES (5, 5);
INSERT INTO terms ("id", "number") VALUES (6, 6);

INSERT INTO categories ("id", "name") VALUES (1, 'Projeto');
INSERT INTO categories ("id", "name") VALUES (2, 'Prática');
INSERT INTO categories ("id", "name") VALUES (3, 'Recuperação');

INSERT INTO teachers ("id", "name") VALUES (1, 'Diego Pinho');
INSERT INTO teachers ("id", "name") VALUES (2, 'Bruna Hamori');

INSERT INTO disciplines ("id", "name", "termId") VALUES (1, 'HTML e CSS', 1);
INSERT INTO disciplines ("id", "name", "termId") VALUES (2, 'JavaScript', 2);
INSERT INTO disciplines ("id", "name", "termId") VALUES (3, 'React', 3);
INSERT INTO disciplines ("id", "name", "termId") VALUES (4, 'Humildade', 1);
INSERT INTO disciplines ("id", "name", "termId") VALUES (5, 'Planejamento', 2);
INSERT INTO disciplines ("id", "name", "termId") VALUES (6, 'Autoconfiança', 3);

INSERT INTO "teachersDisciplines" ("id", "teacherId", "disciplinesId") VALUES (1, 1, 1);
INSERT INTO "teachersDisciplines" ("id", "teacherId", "disciplinesId") VALUES (2, 1, 2);
INSERT INTO "teachersDisciplines" ("id", "teacherId", "disciplinesId") VALUES (3, 1, 3); 
INSERT INTO "teachersDisciplines" ("id", "teacherId", "disciplinesId") VALUES (4, 2, 4);
INSERT INTO "teachersDisciplines" ("id", "teacherId", "disciplinesId") VALUES (5, 2, 5);
INSERT INTO "teachersDisciplines" ("id", "teacherId", "disciplinesId") VALUES (6, 2, 6);

SELECT pg_catalog.setval('public.categories_id_seq', 3, true);
SELECT pg_catalog.setval('public.disciplines_id_seq', 6, true);
SELECT pg_catalog.setval('public."teachersDisciplines_id_seq"', 6, true);
SELECT pg_catalog.setval('public.teachers_id_seq', 2, true);
SELECT pg_catalog.setval('public.terms_id_seq', 6, true);
SELECT pg_catalog.setval('public.tests_id_seq', 1, false);
SELECT pg_catalog.setval('public.users_id_seq', 1, true);