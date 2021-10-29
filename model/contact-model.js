const { Schema, model, SchemaTypes } = require('mongoose')
const { ValidNameLength } = require('../config/constants')
const mongoosePaginate = require('mongoose-paginate-v2');

const contactSchema = new Schema(
  {
    name: {
      type: String,
      minLength: ValidNameLength.MIN_LENGTH,
      maxLength: ValidNameLength.MAX_LENGTH,
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
    owner: {
      type: SchemaTypes.ObjectId,
      ref: "user",
    },
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

contactSchema.plugin(mongoosePaginate);

const Contact = model('contact', contactSchema)

module.exports = Contact
