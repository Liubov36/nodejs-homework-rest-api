const { Contact } = require('../../models/contact');
const { NotFound } = require('../../helpers');

const removeById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw new NotFound();
  }
  res.json({
    message: 'contact deleted',
  });
};

module.exports = removeById;