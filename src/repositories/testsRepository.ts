import { prisma } from "./../config/database.js";
import { TestAdd, TestDb, TeacherDiscipline } from "./../schemas/testsSchema.js";


export async function findTeacherDiscipline(test: TestAdd) {
  return prisma.teachersDisciplines.findFirst({
    where: { 
      teacherId: test.teacherId,
      disciplinesId: test.disciplineId
    },
  });
}

export async function insertTeachersDisciplines(teacherDiscipline: TeacherDiscipline) {
  return prisma.teachersDisciplines.create({
    data: teacherDiscipline
  });
}

export async function insertTest(test: TestDb) {
  return prisma.tests.create({
    data: test
  });
}

export async function testListDiscipline() {
  return prisma.terms.findMany({
    select: {
      number: true,
      disciplines: {
        select: {
          name: true,
          teachersDisciplines: {
            select: {
              teachers: {
                select: {
                  name: true
                }
              },
              tests: {
                select: {
                  name: true,
                  pdfUrl: true,
                  categories: {
                    select: {
                      name: true
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
  });
}