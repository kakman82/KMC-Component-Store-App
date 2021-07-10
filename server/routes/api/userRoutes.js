const express = require('express');
const authController = require('../../controller/authController');

const router = express.Router();

router.post('/auth/signup', authController.signUpUser);

module.exports = router;
