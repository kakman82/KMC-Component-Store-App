const express = require('express')
const { isLoggedIn } = require('../../controller/authController')
const addressController = require('../../controller/addressController')

const router = express.Router()

router.post('/users/addresses', isLoggedIn, addressController.createAddress)
router.get('/users/addresses', isLoggedIn, addressController.getAllAddresses)

//* Select form için İl-ilçe-mah bilgilerinin alınması - ek olarak isLoggedIn çağırmaya gerek duymadım
//* çünkü adres sayfasına gelmeden önce login kontrolü yapıyorum
// Get provinces names
router.get('/pttAddresses/provinces', addressController.getProvinces)
// Get district names by given province name
router.get('/pttAddresses/:province', addressController.getDistricts)
// Get neighbourhood name by given province and district names
router.get(
  '/pttAddresses/:province/:district',
  addressController.getNeighbourhoods
)

//! For only creating document into dh - run only one time, then .csv file imported to the db
router.post('/pttAddresses', addressController.createPttAddress)

module.exports = router
