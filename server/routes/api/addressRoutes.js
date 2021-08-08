const express = require('express')
const { isLoggedIn } = require('../../controller/authController')
const addressController = require('../../controller/addressController')

const router = express.Router()

router.post('/addresses', isLoggedIn, addressController.createAddress)
router.get('/addresses', isLoggedIn, addressController.getAllAddresses)

// Get provinces names
router.get(
  '/pttAddresses/provinces',
  //   isLoggedIn,
  addressController.getProvinces
)
// Get district names by given province name
router.get(
  '/pttAddresses/:province',
  //   isLoggedIn,
  addressController.getDistricts
)
// Get neighbourhood name by given province and district names
router.get(
  '/pttAddresses/:province/:district',
  //   isLoggedIn,
  addressController.getNeighbourhoods
)

// For only creating document into dh - run only one then import .csv file to the db
router.post(
  '/pttAddresses',
  //   isLoggedIn,
  addressController.createPttAddress
)

module.exports = router
