const express = require('express');
const router = express.Router();
const guard = require('../../helpers/guard');
const loginLimit = require('../../helpers/rate-limit-login')

const {
    signup,
    login,
    logout,
    current
} = require('../../controllers/users-controllers');

const {validateSignUp, validateLogIn} = require('./user-validation')

router.post('/signup', validateSignUp, signup);
router.post('/login', validateLogIn, loginLimit, login);
router.post('/logout', guard, logout);

router.get("/current", guard, current);

module.exports = router;
