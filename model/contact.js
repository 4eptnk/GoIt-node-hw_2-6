const { Schema, model } = require('mongoose')
const { ValidLengthContactName } = require('../config/constant')

const contactSchema = new Schema(
  {
    name: {
      type: String,
      minLength: ValidLengthContactName.MIN_LENGTH_NAME,
      maxLength: ValidLengthContactName.MAX_LENGTH_NAME,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
      required: [true, 'Set email for contact'],
      unique: true,
    },
    phone: {
      type: String,
      required: [true, 'Set phone for contact'],
      unique: true,
    },
    favorite: { type: Boolean, default: false },
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id
        return ret
      },
    },
    toObject: { virtuals: true },
  }
)

contactSchema.path('name').validate(function (value) {
  const re = /[A-Z][a-z]+(\s|,)[A-Z][a-z]{1,19}/
  return re.test(String(value))
})

const Contact = model('contact', contactSchema)

module.exports = Contact
