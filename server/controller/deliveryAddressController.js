const DeliveryAddress = require('../models/deliveryAddressModel')

//* @desc: Saving new address to the db
//* @route: POST /api/users/addresses
//* @access: Private
exports.createAddress = async (req, res) => {
  try {
    const newAddress = new DeliveryAddress()
    // user id, authController/isLoggedIn func dan gelecek -decoded=current user
    // req.headers ile gönderilen token dan buluyor user bilgisini
    newAddress.user = req.decoded._id
    newAddress.firstName = req.body.firstName
    newAddress.lastName = req.body.lastName
    newAddress.phone = req.body.phone
    newAddress.province = req.body.province
    newAddress.district = req.body.district
    newAddress.neighbourhood = req.body.neighbourhood
    newAddress.fullAddress = req.body.fullAddress
    newAddress.title = req.body.title

    await newAddress.save()

    res.status(200).json({
      success: true,
      message: 'Teslimat adresi başarıyla kaydedildi!',
      address: newAddress,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

//* @desc: Get all delivery addresses from db
//* @route: GET /api/users/addresses
//* @access: Private
exports.getAllAddresses = async (req, res) => {
  try {
    const addresses = await DeliveryAddress.find({
      user: req.decoded._id,
    }).sort({
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
    const addressToUpdate = await DeliveryAddress.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    )
    res.status(200).json({
      success: true,
      message: 'Teslimat adresi başarıyla güncellenmiştir.',
      updatedAddress: addressToUpdate,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
//* @desc: Deleting existing address - set active property to false!
//* @route: DELETE /api/users/address/:id
//* @access: Private
exports.deleteAddress = async (req, res) => {
  try {
    // not delete set active field to false
    const addressToDelete = await DeliveryAddress.findByIdAndUpdate(
      req.params.id,
      {
        active: false,
      }
    )
    if (!addressToDelete) {
      res.status(400).json({
        success: false,
        message: 'Bu ID bilgisine ait bir adres bulunamadı!',
      })
    }
    res.status(200).json({
      success: true,
      message: 'Teslimat adresi başarılı olarak silinmiştir.',
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
