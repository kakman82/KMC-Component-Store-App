const express = require('express')
const { isLoggedIn } = require('../../controller/authController')
const deliveryAddressController = require('../../controller/deliveryAddressController')

const router = express.Router()

router.post(
  '/users/deliveryAddresses',
  isLoggedIn,
  deliveryAddressController.createAddress
)
router.get(
  '/users/deliveryAddresses',
  isLoggedIn,
  deliveryAddressController.getAllAddresses
)
router.patch(
  '/users/deliveryAddresses/:id',
  isLoggedIn,
  deliveryAddressController.updateAddress
)
router.delete(
  '/users/deliveryAddresses/:id',
  isLoggedIn,
  deliveryAddressController.deleteAddress
)

module.exports = router
