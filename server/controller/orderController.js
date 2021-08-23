const Order = require('../models/orderModel')
const Email = require('../utils/email')
const User = require('../models/userModel')
const Address = require('../models/addressModel')

//* @desc: Creating new order
//* @route: POST /api/users/orders
//* @access: Private
exports.createOrder = async (req, res) => {
  try {
    const newOrder = new Order()

    newOrder.user = req.decoded._id
    newOrder.deliveryAddress = req.body.deliveryAddressId
    newOrder.orderNo = req.body.orderNo
    newOrder.products = req.body.products
    newOrder.tax = req.body.orderAmounts.cartTaxTL
    newOrder.serviceFee = req.body.orderAmounts.cartFeeTL
    newOrder.serviceFeeRate = req.body.orderAmounts.serviceFeeRate
    newOrder.total = req.body.orderAmounts.cartTotalTL
    newOrder.sumTotal = req.body.orderAmounts.orderTotalTL

    await newOrder.save()

    //* lean() metodu json yerine pojo yani plain javascript objesi döndürür
    //* mail body için oluşturulan handlebars template okuması için bunu kullandım
    const user = await User.findById(newOrder.user).lean()
    const address = await Address.findById(newOrder.deliveryAddress).lean()
    const order = await Order.findById(newOrder._id).lean()

    await new Email(user, null, order, address).sendOrderInfo(order.orderNo)

    res.status(200).json({
      success: true,
      message: 'Sipariş onaylandı...',
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

//* @desc: Get all orders by given user id
//* @route: GET /api/users/orders/:id
//* @access: Private
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.id })

    res.status(200).json({
      success: true,
      orders: orders,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
