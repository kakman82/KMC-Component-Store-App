const express = require('express')
const { isLoggedIn } = require('../../controller/authController')
const addressController = require('../../controller/addressController')

const router = express.Router()

router.post('/users/addresses', isLoggedIn, addressController.createAddress)
router.get('/users/addresses', isLoggedIn, addressController.getAllAddresses)
router.patch('/users/address/:id', isLoggedIn, addressController.updateAddress)
router.delete('/users/address/:id', isLoggedIn, addressController.deleteAddress)

//* PTT Address routes;
// Get provinces names
router.get(
  '/users/pttAddresses/provinces',
  isLoggedIn,
  addressController.getProvinces
)
// Get district names by given province name
router.get(
  '/users/pttAddresses/:province',
  isLoggedIn,
  addressController.getDistricts
)
// Get neighbourhood name by given province and district names
router.get(
  '/users/pttAddresses/:province/:district',
  addressController.getNeighbourhoods
)

//! For only creating document into dh - run only one time, then .csv file imported to the db
router.post('/pttAddresses', addressController.createPttAddress)

module.exports = router
