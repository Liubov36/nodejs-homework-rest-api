const express = require('express');

const { contacts: ctrl } = require('../../controllers');

const { isValidId, validationBody, auth } = require('../../middlewares');

const { schemas } = require('../../models/contact');

const router = express.Router();

router.get('/', auth, ctrl.getAll );

router.get('/:contactId', isValidId, ctrl.getById);

router.post('/', auth, validationBody(schemas.addSchema), ctrl.add);

router.delete('/:contactId', isValidId, ctrl.removeById);

router.put('/:contactId', isValidId, validationBody(schemas.addSchema), ctrl.updateById);

router.patch(':id/favorite', isValidId, validationBody(schemas.updateFavoriteSchema), ctrl.updateFavorite);

module.exports = router;
