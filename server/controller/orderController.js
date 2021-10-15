const Order = require('../models/orderModel')
const Email = require('../utils/email')
const User = require('../models/userModel')
const DeliveryAddress = require('../models/deliveryAddressModel')
const BillingAddress = require('../models/billingAddressModel')

//* @desc: Creating new order
//* @route: POST /api/users/orders
//* @access: Private
exports.createOrder = async (req, res) => {
  try {
    const newOrder = new Order()

    newOrder.user = req.decoded._id
    newOrder.deliveryAddress = req.body.deliveryAddressId
    newOrder.billingAddress = req.body.billingAddressId
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
    const deliveryAddress = await DeliveryAddress.findById(
      newOrder.deliveryAddress
    ).lean()
    const billingAddress = await BillingAddress.findById(
      newOrder.billingAddress
    ).lean()
    const order = await Order.findById(newOrder._id).lean()

    await new Email(
      user,
      null,
      order,
      deliveryAddress,
      billingAddress
    ).sendOrderInfo(order.orderNo)

    res.status(201).json({
      success: true,
      message: 'Siparişin bize ulaştı...',
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
      .populate('deliveryAddress')
      .populate('billingAddress')
      .sort({
        createdAt: 'desc',
      })

    res.status(200).json({
      success: true,
      orderResult: orders.length,
      orders: orders,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

//* @desc: Get all user orders for given role
//* @route: GET /api/users/orders
//* @access: Private
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user')
      .populate('deliveryAddress')
      .populate('billingAddress')
      .sort({
        createdAt: 'desc',
      })
    res.status(200).json({
      success: true,
      orderResult: orders.length,
      orders: orders,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

//* @desc: Update order status
//* @route: PATCH /api/users/orders
//* @access: Private
exports.updateOrderStatus = async (req, res) => {
  try {
    const orderToUpdate = await Order.findByIdAndUpdate(
      { _id: req.body.orderId },
      { status: req.body.newStatus }
    )

    const updatedOrder = await Order.findById(req.body.orderId)
      .populate('user')
      .populate('deliveryAddress')
      .populate('billingAddress')
      .lean()

    if (
      orderToUpdate.status === 'Ödeme Bekliyor' &&
      updatedOrder.status === 'Tedarik Aşamasında'
    ) {
      await new Email(
        updatedOrder.user,
        null,
        updatedOrder,
        updatedOrder.deliveryAddress,
        updatedOrder.billingAddress
      ).sendPaymentConfirmedInfo(updatedOrder.orderNo)
    }

    res.status(201).json({
      success: true,
      message: 'Siparişin durumu başarıyla güncellendi.',
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
