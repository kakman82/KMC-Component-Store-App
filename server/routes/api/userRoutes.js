const express = require('express');
const authController = require('../../controller/authController');
const userController = require('../../controller/userController');

const router = express.Router();

router.post('/auth/signup', authController.signUpUser);
// buradaki url /auth/login user ve logout tanımı nuxt/auth moduldeki tanım ile uyumlu olmalı!
router.post('/auth/login', authController.loginUser);
// önce isLoggedIn ile token verify mi ona bakılacak sonra profil bilgisi gelecek
router.get('/auth/user', authController.isLoggedIn, userController.userProfile);

module.exports = router;
