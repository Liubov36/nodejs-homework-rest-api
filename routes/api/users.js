const express = require('express');

const { users: ctrl } = require('../../controllers');

const { validationBody, auth, upload } = require('../../middlewares');

const { schemas } = require('../../models/user');

const router = express.Router();

router.post('/signup', validationBody(schemas.joiSignupSchema), ctrl.signup);

router.post('/login', validationBody(schemas.joiLoginSchema), ctrl.login);

router.get('/current', auth, ctrl.getCurrent);

router.get('/verify/:verificationToken', ctrl.verifyEmail);

router.post('/verify', ctrl.reVerification);

router.get('/logout', auth, ctrl.logout);
 
router.patch('/avatars', auth, upload.single('avatar'), ctrl.updateAvatar);

module.exports = router;