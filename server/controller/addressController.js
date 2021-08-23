const Address = require('../models/addressModel')
const PttAddress = require('../models/pttAddressModel')
const path = require('path')
const fs = require('fs') // core node
const rawData = fs.readFileSync(
  path.join(__dirname, '../utils/pttAddress_20210624.json'),
  'utf-8'
)
const ptt = JSON.parse(rawData)

//* @desc: Saving new address to the db
//* @route: POST /api/users/addresses
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
//* @route: POST /api/users/addresses
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
//* @route: PATCH /api/users/address/:id
//* @access: Private
exports.updateAddress = async (req, res) => {
  try {
    const addressToUpdate = await Address.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    )
    res.status(200).json({
      success: true,
      message: 'Adres başarıyla güncellenmiştir.',
      updatedAddress: addressToUpdate,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
//* @desc: Deleting existing address
//* @route: DELETE /api/users/address/:id
//* @access: Private
exports.deleteAddress = async (req, res) => {
  try {
    const addressToDelete = await Address.findById(req.params.id)
    if (!addressToDelete) {
      res.status(400).json({
        success: false,
        message: 'Bu ID bilgisine ait bir adres bulunamadı!',
      })
    }
    await addressToDelete.deleteOne()
    res.status(200).json({
      success: true,
      message: 'Adres başarılı olarak silinmiştir.',
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

//* @desc: Fetch province names from db
//* @route: GET /api/users/pttAddresses/provinces
//* @access: Private
exports.getProvinces = async (req, res) => {
  try {
    //? MONGODB kullanırsak bu şekilde olurdu ama db de 10mb yer kaplıyordu
    //? o yüzden dosyadan okuma ile ilerledim..
    // const response = await PttAddress.find({})
    //   .select('province')
    //   .sort({ province: 'asc' })
    //   .collation({ locale: 'tr' })
    //   .distinct('province')

    const response = await [...new Set(ptt.map((el) => el.province))].sort(
      (a, b) => a.localeCompare(b)
    )

    res.status(200).json({
      success: true,
      result: response.length,
      provinces: response,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      ı,
    })
  }
}

//* @desc: Get districts by given province name
//* @route: GET /api/users/pttAddresses/:province
//* @access: Private
exports.getDistricts = async (req, res) => {
  try {
    // const response = await PttAddress.find({ province: req.params.province })
    //   .select('district')
    //   .sort({ district: 'asc' })
    //   .collation({ locale: 'tr' })
    //   .distinct('district')

    const districts = await ptt
      .filter((el) => el.province === req.params.province)
      .map((val) => val.district)

    const response = [...new Set(districts)].sort((a, b) => a.localeCompare(b))

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
//* @route: GET /api/users/pttAddresses/neighbourhood
//* @access: Private
exports.getNeighbourhoods = async (req, res) => {
  try {
    // const response = await PttAddress.find({
    //   province: req.params.province,
    //   district: req.params.district,
    // })
    //   .select('neighbourhood')
    //   .sort({ neighbourhood: 'asc' })
    //   .collation({ locale: 'tr' })
    //   .distinct('neighbourhood')
    const data = await ptt
      .filter(
        (el) =>
          el.province === req.params.province &&
          el.district === req.params.district
      )
      .map((val) => val.neighbourhood)

    const response = [...new Set(data)].sort((a, b) => a.localeCompare(b))

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
//* @route: POST /api/users/pttAddresses
//* @access: Private
exports.createPttAddress = async (req, res) => {
  try {
    const newData = new PttAddress()
    //console.log(req.body)
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
