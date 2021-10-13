const express = require('express')
const { isLoggedIn } = require('../../controller/authController')
const billingAddressController = require('../../controller/billingAddressController')
const router = express.Router()

router.post(
  '/users/billingAddresses',
  isLoggedIn,
  billingAddressController.createBillAddress
)

router.get(
  '/users/billingAddresses',
  isLoggedIn,
  billingAddressController.getBillAddress
)

module.exports = router
