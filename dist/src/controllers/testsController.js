var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as testsService from "../services/testsService.js";
export function testAddPOST(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const test = req.body;
        const userId = res.locals.userId;
        const validateTestAdd = yield testsService.validateTestAdd(test);
        if (!validateTestAdd.res) {
            res.status(401).send(validateTestAdd.text);
            return;
        }
        const insertIntoDatabase = yield testsService.insertIntoDatabase(test, userId);
        if (!insertIntoDatabase.res) {
            res.status(401).send(insertIntoDatabase.text);
            return;
        }
        res.sendStatus(201);
    });
}
export function testListDisciplineGET(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const testListDiscipline = yield testsService.testListDiscipline();
        if (!testListDiscipline) {
            res.status(404);
            return;
        }
        res.send(testListDiscipline);
    });
}
export function testListTeacherGET(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const testListTeacher = yield testsService.testListTeacher();
        if (!testListTeacher) {
            res.status(404);
            return;
        }
        res.send(testListTeacher);
    });
}
