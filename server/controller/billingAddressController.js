const BillingAddress = require('../models/billingAddressModel')

//* @desc: Saving new bill address to the db
//* @route: POST /api/users/billingAddresses
//* @access: Private
exports.createBillAddress = async (req, res) => {
  try {
    const newBillAddress = new BillingAddress()

    newBillAddress.user = req.decoded._id
    newBillAddress.billType = req.body.billType
    newBillAddress.companyName = req.body.companyName
    newBillAddress.companyTaxNumber = req.body.companyTaxNumber
    newBillAddress.companyTaxOffice = req.body.companyTaxOffice
    newBillAddress.personFullName = req.body.personFullName
    newBillAddress.personIDNumber = req.body.personIDNumber
    newBillAddress.province = req.body.province
    newBillAddress.district = req.body.district
    newBillAddress.neighbourhood = req.body.neighbourhood
    newBillAddress.fullAddress = req.body.fullAddress

    await newBillAddress.save()

    res.status(200).json({
      success: true,
      message: 'Fatura adresi başarıyla kaydedildi!',
      billAddress: newBillAddress,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
