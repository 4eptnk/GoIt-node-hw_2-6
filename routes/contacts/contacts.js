const express = require('express')

const router = express.Router()

const {
  getContactsList,
  getContactById,
  addContact,
  deleteContactById,
  updateContactById,
  updateStatusContact,
} = require('../../controllers/contacts-controllers')

const { validateContactId, validateContact, validateUpdateContact, validateStatusContact } = require('./contact-validation.js')

const guard = require('../../helpers/guard')

const wrapError = require('../../helpers/error-handler')

router.get('/', guard, wrapError(getContactsList))

router.get('/:contactId', guard, validateContactId, wrapError(getContactById))

router.post('/', guard, validateContact, wrapError(addContact))

router.delete('/:contactId', guard, validateContactId, wrapError(deleteContactById))

router.put('/:contactId', guard, validateContactId, validateUpdateContact, wrapError(updateContactById))

router.patch('/:contactId', guard, [validateContactId, validateUpdateContact], wrapError(updateContactById))

router.patch('/:contactId/favorite', guard, [validateContactId, validateStatusContact], wrapError(updateStatusContact))

module.exports = router
