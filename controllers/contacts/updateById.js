const { Contact } = require('../../models/contact');
const { NotFound } = require('../../helpers');

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw new NotFound();
  }
  res.json(result);
};

module.exports = updateById;