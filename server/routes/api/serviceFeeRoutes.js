const express = require('express')
const serviceFeeController = require('../../controller/serviceFeeController')
const authController = require('../../controller/authController')

const router = express.Router()

router
  .route('/serviceFee')
  .post(
    authController.isLoggedIn,
    authController.isUserRoleAllowed('admin'),
    serviceFeeController.createServiceFee
  )
  .get(serviceFeeController.getServiceFee)

module.exports = router
