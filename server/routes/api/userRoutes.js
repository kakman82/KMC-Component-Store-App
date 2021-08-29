const express = require('express')
const authController = require('../../controller/authController')
const userController = require('../../controller/userController')

const router = express.Router()

router.post('/auth/signup', authController.signUpUser)
// buradaki url /auth/login user ve logout tanımı nuxt/auth moduldeki tanım ile uyumlu olmalı!
router.post('/auth/login', authController.loginUser)
// şifre değişikliği
router.post('/users/forgotPassword', authController.forgotPassword)
router.patch('/users/resetPassword/:token', authController.resetPassword)

// önce isLoggedIn ile token verify mi ona bakılacak sonra profil bilgisi gelecek
router.get(
  '/users/profile/:id',
  authController.isLoggedIn,
  userController.userProfile
)
// update password by already loggedin user
//! bu route tanımının diğer /:id patch olandan önce olması şart yoksa her seferinde diğeri çalışır!
router.patch('/users/profile/updateMyPassword', authController.updatePassword)

// update user profile -name and email
router.patch(
  '/users/profile/:id',
  authController.isLoggedIn,
  userController.updateUserProfile
)
// get all users by only admin role;
router.get(
  '/users',
  authController.isLoggedIn,
  authController.isUserRoleAllowed('admin'),
  userController.getAllUsers
)

// update one user only by admin role
router.patch(
  '/users',
  authController.isLoggedIn,
  authController.isUserRoleAllowed('admin'),
  userController.updateOneUserByAdmin
)

module.exports = router
