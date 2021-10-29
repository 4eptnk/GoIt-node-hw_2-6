const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
const { ValidNameLength } = require('../../config/constants')

const schemaSingUp = Joi.object({
  name: Joi.string().min(ValidNameLength.MIN_LENGTH).max(ValidNameLength.MAX_LENGTH).required(),
  email: Joi.string().email().required(),
  password: Joi.string().alphanum().required(),
})

const schemaLogIn = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().alphanum().required(),
  });

const validate = async (schema, obj, res, next) => {
  try {
    await schema.validateAsync(obj)
    next()
  } catch (error) {
    res.status(400).json({
      status: 'error',
      code: 400,
      message: `Field ${error.message.replace(/"/g, '')}`,
    })
  }
}

module.exports.validateSignUp = async (req, res, next) => {
  return await validate(schemaSingUp, req.body, res, next)
}

module.exports.validateLogIn = async (req, res, next) => {
  return await validate(schemaLogIn, req.body, res, next)
}

