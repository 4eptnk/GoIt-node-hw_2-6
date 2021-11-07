const express = require('express');
const router = express.Router();
const guard = require('../../helpers/guard');
const loginLimit = require('../../helpers/rate-limit-login');
const upload = require('../../helpers/uploads')
const wrapError = require('../../helpers/error-handler')

const {
    signup,
    login,
    logout,
    current,
    uploadAvatar,
    verifyUser,
    resendVerifyUser,
} = require('../../controllers/users-controllers');

const {validateSignUp, validateLogIn} = require('./user-validation')

router.post('/signup', validateSignUp, signup);
router.post('/login', validateLogIn, loginLimit, login);
router.post('/logout', guard, logout);

router.patch('/avatar', guard, upload.single('avatar'), uploadAvatar);

router.get("/current", guard, current);

router.get('/verify/:verificationToken', wrapError(verifyUser));
router.post('verify', resendVerifyUser)

module.exports = router;
