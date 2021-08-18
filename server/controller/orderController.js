const Order = require('../models/orderModel')

//* @desc: Creating new order
//* @route: POST /api/users/orders
//* @access: Private
exports.createOrder = async (req, res) => {
  try {
    const newOrder = new Order()

    newOrder.user = req.decoded._id
    newOrder.deliveryAddress = req.body.deliveryAddressId
    newOrder.orderId = req.body.orderId
    newOrder.products = req.body.products

    await newOrder.save()

    res.status(200).json({
      success: true,
      message: 'Siparişiniz alınmıştır.',
      order: newOrder,
    })
  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
