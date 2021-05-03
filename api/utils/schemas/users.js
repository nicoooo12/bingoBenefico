const Joi = require('joi')

const createUserSchema =Joi.object({
  name: Joi
    .string()
    .max(100)
    .required(),
  email: Joi
    .string()
    .email()
    .required(),
  password: Joi.string().required(),
  isAdmin: Joi.boolean()
});


module.exports = {
  createUserSchema,
};