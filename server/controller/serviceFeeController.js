const ServiceFee = require('../models/serviceFeeModel')

//* @desc: Saving service fee value to the db
//* @route: POST /api/serviceFee
//* @access: Public
exports.createServiceFee = async (req, res) => {
  try {
    const newFee = new ServiceFee()
    newFee.serviceFee = req.body.serviceFee
    await newFee.save()
    res.status(200).json({
      success: true,
      data: {
        newFee,
      },
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
    const fee = await ServiceFee.find().sort({ createdAt: 'desc' }).limit(1)
    res.status(200).json({
      success: true,
      data: {
        fees: fee,
      },
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
