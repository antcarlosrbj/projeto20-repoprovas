import Joi from "joi";

export const testAdd = Joi.object<TestAdd>({
  name: Joi.string().required(),
  pdfUrl: Joi.string().required(),
  categoryId: Joi.number().required(),
  disciplineId: Joi.number().required(),
  teacherId: Joi.number().required()
});

export type TestAdd = {
  name: string
  pdfUrl: string
  categoryId: number
  disciplineId: number
  teacherId: number
};

export type TestDb = {
  name: string
  pdfUrl: string
  categoryId: number
  teacherDisciplineId: number
  userId: number
};

export type TeacherDiscipline = {
  teacherId: number
  disciplinesId: number
};