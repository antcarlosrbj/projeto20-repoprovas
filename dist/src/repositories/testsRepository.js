var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { prisma } from "./../config/database.js";
export function findTeacherDiscipline(test) {
    return __awaiter(this, void 0, void 0, function* () {
        return prisma.teachersDisciplines.findFirst({
            where: {
                teacherId: test.teacherId,
                disciplinesId: test.disciplineId
            },
        });
    });
}
export function insertTeachersDisciplines(teacherDiscipline) {
    return __awaiter(this, void 0, void 0, function* () {
        return prisma.teachersDisciplines.create({
            data: teacherDiscipline
        });
    });
}
export function insertTest(test) {
    return __awaiter(this, void 0, void 0, function* () {
        return prisma.tests.create({
            data: test
        });
    });
}
export function testListDiscipline() {
    return __awaiter(this, void 0, void 0, function* () {
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
    });
}
export function testListTeacher() {
    return __awaiter(this, void 0, void 0, function* () {
        return prisma.teachers.findMany({
            select: {
                name: true,
                teachersDisciplines: {
                    select: {
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
                        },
                        disciplines: {
                            select: {
                                name: true
                            }
                        }
                    }
                }
            }
        });
    });
}
