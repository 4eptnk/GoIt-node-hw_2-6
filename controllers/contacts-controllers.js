const Contacts = require('../repository/contacts-repository')
const {CustomError} = require('../helpers/custom-error')

const getContactsList = async (req, res) => {
    const userId = req.user._id;
    const data = await Contacts.listContacts(userId, req.query);
    res.json({ status: 'success', code: 200, data: { ...data } })
}

const getContactById = async (req, res) => {
    const userId = req.user._id;
    const contact = await Contacts.getContactById(req.params.contactId, userId)

    if (contact) {
      return res
        .status(200)
        .json({ status: 'success', code: 200, data: { contact } })
    }

    throw new CustomError(404, "Not Found");
}

const addContact = async (req, res) => {
    const userId = req.user._id;
    const contact = await Contacts.addContact({...req.body, owner: userId})
    res.status(201).json({ status: 'success', code: 201, data: { contact } })
}

const deleteContactById = async (req, res) => {
    const userId = req.user._id;
    const contact = await Contacts.removeContact(req.params.contactId, userId)

    if (contact) {
      return res
        .status(200)
        .json({ status: 'success', code: 200, data: { contact } })
    }
    throw new CustomError(404, "Not Found");
}

const updateContactById = async (req, res, next) => {
    const userId = req.user._id;
    const contact = await Contacts.updateContact(
      req.params.contactId,
      req.body,
      userId
    )

    if (contact) {
      return res
        .status(200)
        .json({ status: 'success', code: 200, data: { contact } })
    }
    throw new CustomError(404, "Not Found");
}

const updateStatusContact = async (req, res, next) => {
    const contact = await Contacts.updateContact(
      req.params.contactId,
      req.body
    )
    if (contact) {
      return res.status(200).json({
        status: 'success',
        code: 200,
        data: { contact },
        message: `Status contact with name ${req.body.name} updated!`,
      })
    }
    throw new CustomError(404, `Contact with id ${req.params.contactId} is not found!`);
}

module.exports = {
  getContactsList,
  getContactById,
  addContact,
  deleteContactById,
  updateContactById,
  updateStatusContact,
}
