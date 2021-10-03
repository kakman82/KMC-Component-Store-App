const express = require('express')
const { isLoggedIn } = require('../../controller/authController')
const pttAddressController = require('../../controller/pttAddressController')

const router = express.Router()

// Get provinces names
router.get(
  '/users/pttAddresses/provinces',
  isLoggedIn,
  pttAddressController.getProvinces
)
// Get district names by given province name
router.get(
  '/users/pttAddresses/:province',
  isLoggedIn,
  pttAddressController.getDistricts
)
// Get neighbourhood name by given province and district names
router.get(
  '/users/pttAddresses/:province/:district',
  pttAddressController.getNeighbourhoods
)

module.exports = router
