const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
const { ValidNameLength } = require('../../config/constants')

const patternPhone = '\\(?(\\d{3})\\)?[- ]?(\\d{3})[- ]?(\\d{2})[- ]?(\\d{2})'

const schemaContact = Joi.object({
  name: Joi.string().min(ValidNameLength.MIN_LENGTH).max(ValidNameLength.MAX_LENGTH).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(new RegExp(patternPhone)).required(),
  favorite: Joi.boolean().optional(),
})

const schemaContactId = Joi.object({
  contactId: Joi.objectId().required(),
})

const schemaUpdateContact = Joi.object({
  name: Joi.string().min(ValidNameLength.MIN_LENGTH).max(ValidNameLength.MAX_LENGTH).optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().pattern(new RegExp(patternPhone)).optional(),
  favorite: Joi.boolean().optional(),
}).min(1)

const schemaStatusContact = Joi.object({
  favorite: Joi.boolean().required(),
})

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

module.exports.validateContact = async (req, res, next) => {
  return await validate(schemaContact, req.body, res, next)
}

module.exports.validateContactId = async (req, res, next) => {
  return await validate(schemaContactId, req.params, res, next)
}

module.exports.validateUpdateContact = async (req, res, next) => {
  return await validate(schemaUpdateContact, req.body, res, next)
}

module.exports.validateStatusContact = async (req, res, next) => {
  return await validate(schemaStatusContact, req.body, res, next)
}
