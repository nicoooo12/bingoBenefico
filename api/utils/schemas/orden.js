const Joi = require('joi');
const { createConnection } = require('mongoose');

const createUserSchema =Joi.object({
  compra: Joi
    .array()
    .required(),
  totalPago: Joi
    .number()
    .required(),
  tipoDePago: Joi
    .string()
    .required(),
});

const addCanvasUrlSchema = Joi.object({
  data: Joi
    .string()
    .required(),
})

module.exports = {
  createUserSchema,
  addCanvasUrlSchema,
};