const express = require('express');

const { users: ctrl } = require('../../controllers');

const { validationBody, auth } = require('../../middlewares');

const { schemas } = require('../../models/user');

const router = express.Router();

router.post('/signup', validationBody(schemas.joiSignupSchema), ctrl.signup);

router.post('/login', validationBody(schemas.joiLoginSchema), ctrl.login);

router.get('/current', auth, ctrl.getCurrent);

router.get('/logout', auth, ctrl.logout);

module.exports = router;