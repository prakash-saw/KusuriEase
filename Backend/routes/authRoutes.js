const express = require('express');
const router = express.Router();
const { signup, login, forgotPassword, resetPassword } = require('../controllers/authController');
const { validateSignup, validateLogin } = require('../middleware/validator');

router.post('/signup', validateSignup, signup);
router.post('/login', validateLogin, login);
router.post('/forgot-password', forgotPassword);
router.put('/reset-password/:token', resetPassword);

module.exports = router;