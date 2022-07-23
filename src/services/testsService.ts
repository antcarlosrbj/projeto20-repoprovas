import * as testsRepository from "./../repositories/testsRepository.js";
import { testAdd, TestAdd } from "../schemas/testsSchema.js";


export async function validateTestAdd(test: TestAdd) {

    const validation = testAdd.validate(test);
    if (validation.error) {
      return {res: false, text: validation.error.details[0].message};
    }

    return {res: true}
}

export async function insertIntoDatabase(test: TestAdd, userId: number) {
    
    let teacherDisciplineId = 0;

    const findTeacherDiscipline = await testsRepository.findTeacherDiscipline(test)

    if (!findTeacherDiscipline) {
        const insertTeachersDisciplines = await testsRepository.insertTeachersDisciplines({
            teacherId: test.teacherId,
            disciplinesId: test.disciplineId
        })

        teacherDisciplineId = insertTeachersDisciplines.id;
    } else {
        teacherDisciplineId = findTeacherDiscipline.id;
    }

    await testsRepository.insertTest({
        name: test.name,
        pdfUrl: test.pdfUrl,
        categoryId: test.categoryId,
        teacherDisciplineId: teacherDisciplineId,
        userId: userId
    })

    return {res: true, text: ""}
}