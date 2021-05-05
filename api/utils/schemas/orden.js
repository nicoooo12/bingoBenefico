const Joi = require('joi');

const createOrdenSchema =Joi.object({
  compra: Joi
    .array().items(
      Joi.object({
        serie: Joi
        .number()
        .required(),
        cantidad: Joi
        .number()
        .required(),
      })
    )
    .required(),
  totalPago: Joi
    .number()
    .required(),
  tipoDePago: Joi
    .string()
    .required(),
});

const editOrdenSchema =Joi.object({
  compra: Joi
    .array().items(
      Joi.object({
        serie: Joi
        .number()
        .required(),
        cantidad: Joi
        .number()
        .required(),
      })
    ),
  totalPago: Joi
    .number(),
  tipoDePago: Joi
    .string(),
});

const addCanvasUrlSchema = Joi.object({
  data: Joi
    .string()
    .required(),
})

module.exports = {
  createOrdenSchema,
  addCanvasUrlSchema,
  editOrdenSchema
};