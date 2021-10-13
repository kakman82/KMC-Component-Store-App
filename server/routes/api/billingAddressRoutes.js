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

router.patch(
  '/users/billingAddresses/:id',
  isLoggedIn,
  billingAddressController.updateBillAddress
)

module.exports = router
