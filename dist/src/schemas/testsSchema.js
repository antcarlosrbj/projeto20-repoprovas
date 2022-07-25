import Joi from "joi";
export const testAdd = Joi.object({
    name: Joi.string().required(),
    pdfUrl: Joi.string().required(),
    categoryId: Joi.number().required(),
    disciplineId: Joi.number().required(),
    teacherId: Joi.number().required()
});
