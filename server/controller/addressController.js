const Address = require('../models/addressModel')
const PttAddress = require('../models/pttAddressModel')

//* @desc: Saving new address to the db
//* @route: POST /api/addresses
//* @access: Private
exports.createAddress = async (req, res) => {
  try {
    const newAddress = new Address()
    // user id, authController/isLoggedIn func dan gelecek -decoded=current user
    // req.headers ile gönderilen token dan buluyor user bilgisini
    newAddress.user = req.decoded._id
    newAddress.firstName = req.body.firstName
    newAddress.lastName = req.body.lastName
    newAddress.companyName = req.body.companyName
    newAddress.phone = req.body.phone
    newAddress.province = req.body.province
    newAddress.district = req.body.district
    newAddress.neighbourhood = req.body.neighbourhood
    newAddress.fullAddress = req.body.fullAddress
    newAddress.title = req.body.title

    await newAddress.save()

    res.status(200).json({
      success: true,
      message: 'Adres başarıyla kaydedildi!',
      address: newAddress,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

//* @desc: Saving new address to the db
//* @route: POST /api/addresses
//* @access: Private
exports.getAllAddresses = async (req, res) => {
  try {
    const addresses = await Address.find({ user: req.decoded._id }).sort({
      updatedAt: 'desc',
    })
    res.status(200).json({
      success: true,
      result: addresses.length,
      addresses: addresses,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

//* @desc: Updating existing address
//* @route: PATCH /api/addresses/:_id
//* @access: Private
exports.updateAddress = (req, res) => {}

//* @desc: Fetch province names from db
//* @route: GET /api/pttAddresses/provinces
//* @access: Private
exports.getProvinces = async (req, res) => {
  try {
    const response = await PttAddress.find({})
      .select('province')
      .sort({ province: 'asc' })
      .collation({ locale: 'tr' })
      .distinct('province')

    res.status(200).json({
      success: true,
      result: response.length,
      provinces: response,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

//* @desc: Get districts by given province name
//* @route: GET /api/pttAddresses/district
//* @access: Private
exports.getDistricts = async (req, res) => {
  try {
    const response = await PttAddress.find({ province: req.params.province })
      .select('district')
      .sort({ district: 'asc' })
      .collation({ locale: 'tr' })
      .distinct('district')

    res.status(200).json({
      success: true,
      result: response.length,
      districts: response,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

//* @desc: Get neighbourhoods by given province and district name
//* @route: GET /api/pttAddresses/neighbourhood
//* @access: Private
exports.getNeighbourhoods = async (req, res) => {
  try {
    const response = await PttAddress.find({
      province: req.params.province,
      district: req.params.district,
    })
      .select('neighbourhood')
      .sort({ neighbourhood: 'asc' })
      .collation({ locale: 'tr' })
      .distinct('neighbourhood')

    res.status(200).json({
      success: true,
      result: response.length,
      neighbourhoods: response,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

//*! @desc: For creating new document in db - only one time used!
//* @route: POST /api/pttAddresses
//* @access: Private
exports.createPttAddress = async (req, res) => {
  try {
    const newData = new PttAddress()
    console.log(req.body)
    newData.province = req.body.city
    await newData.save()
    res.status(200).json({
      success: true,
      result: newData.length,
      addresses: newData,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
