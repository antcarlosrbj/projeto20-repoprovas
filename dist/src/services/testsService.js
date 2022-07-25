var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as testsRepository from "./../repositories/testsRepository.js";
import { testAdd } from "../schemas/testsSchema.js";
export function validateTestAdd(test) {
    return __awaiter(this, void 0, void 0, function* () {
        const validation = testAdd.validate(test);
        if (validation.error) {
            return { res: false, text: validation.error.details[0].message };
        }
        return { res: true };
    });
}
export function insertIntoDatabase(test, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        let teacherDisciplineId = 0;
        const findTeacherDiscipline = yield testsRepository.findTeacherDiscipline(test);
        if (!findTeacherDiscipline) {
            const insertTeachersDisciplines = yield testsRepository.insertTeachersDisciplines({
                teacherId: test.teacherId,
                disciplinesId: test.disciplineId
            });
            teacherDisciplineId = insertTeachersDisciplines.id;
        }
        else {
            teacherDisciplineId = findTeacherDiscipline.id;
        }
        yield testsRepository.insertTest({
            name: test.name,
            pdfUrl: test.pdfUrl,
            categoryId: test.categoryId,
            teacherDisciplineId: teacherDisciplineId,
            userId: userId
        });
        return { res: true, text: "" };
    });
}
export function testListDiscipline() {
    return __awaiter(this, void 0, void 0, function* () {
        const testListDiscipline = yield testsRepository.testListDiscipline();
        if (!testListDiscipline) {
            return null;
        }
        return testListDiscipline;
    });
}
export function testListTeacher() {
    return __awaiter(this, void 0, void 0, function* () {
        const testListTeacher = yield testsRepository.testListTeacher();
        if (!testListTeacher) {
            return null;
        }
        return testListTeacher;
    });
}
