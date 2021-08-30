const ServiceFee = require('../models/serviceFeeModel')

//* @desc: Saving service fee value to the db by ADMIN
//* @route: POST /api/serviceFee
//* @access: Private & ADMIN
exports.createServiceFee = async (req, res) => {
  try {
    const newFee = new ServiceFee()
    newFee.serviceFee = req.body.serviceFee
    await newFee.save()

    res.status(200).json({
      success: true,
      message: 'Yeni oran başarıyla kaydedildi.',
      newFee,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

//* @desc: Get latest service fee value
//* @route: GET /api/serviceFee
//* @access: Public
exports.getServiceFee = async (req, res) => {
  try {
    const fees = await ServiceFee.find().sort({ createdAt: 'desc' })
    res.status(200).json({
      success: true,
      fees,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
