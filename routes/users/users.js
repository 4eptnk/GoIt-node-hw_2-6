const express = require('express');
const router = express.Router();
const guard = require('../../helpers/guard');
const loginLimit = require('../../helpers/rate-limit-login');
const upload = require('../../helpers/uploads')

const {
    signup,
    login,
    logout,
    current,
    uploadAvatar
} = require('../../controllers/users-controllers');

const {validateSignUp, validateLogIn} = require('./user-validation')

router.post('/signup', validateSignUp, signup);
router.post('/login', validateLogIn, loginLimit, login);
router.post('/logout', guard, logout);

router.patch('/avatar', guard, upload.single('avatar'), uploadAvatar);

router.get("/current", guard, current);

module.exports = router;
