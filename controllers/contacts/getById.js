const { Contact }  = require('../../models/contact');
const { NotFound } = require('http-errors');

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    throw new NotFound(`Contact ${contactId} not found`);
  }
  res.json(result);
};

module.exports = getById;