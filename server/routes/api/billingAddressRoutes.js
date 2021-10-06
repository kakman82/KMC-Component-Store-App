const express = require('express')
const { isLoggedIn } = require('../../controller/authController')
const billingAddressController = require('../../controller/billingAddressController')
const router = express.Router()

router.post(
  '/users/billingAddresses',
  isLoggedIn,
  billingAddressController.createBillAddress
)

module.exports = router
