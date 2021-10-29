const {updateContactById} = require('../controllers/contacts-controllers')
const Contacts = require('../repository/contacts-repository');
const {CustomError} = require("../helpers/custom-error");

jest.mock('../repository/contacts-repository');

describe('Unit test controller updateContactById', () => {

    const req = { params: {contactId: 3}, body: {}, user: {_id: 1}}
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn((data) => data),
    }
    const next = jest.fn();

    beforeEach(() => {
        Contacts.updateContact = jest.fn()
    })

    it('Contact exists', async () => {
        const contact = {
            contactId: 3,
            name: "Allen Raymond",
            phone: "(992) 914-3792"
        }
        Contacts.updateContact = jest.fn(() => {
            return contact
        })
        const result = await updateContactById(req, res, next)
        expect(result).toBeDefined()
        expect(result).toHaveProperty('status')
        expect(result).toHaveProperty('code')
        expect(result).toHaveProperty('data')
        expect(result.data.contact).toEqual(contact)
    })
    it('Contact does not exist v.1.0', async () => {
        await expect(updateContactById(req, res, next)) .rejects.toEqual(
            new CustomError(404, "Not Found")
        )
    })

    it('Contact does not exist v.1.1', async () => {
        return updateContactById(req, res, next).catch((error) => {
            expect(error.status).toEqual(404),
            expect(error.message).toEqual("Not Found")

        })
    })

})