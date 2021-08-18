const router = require('express').Router()
const { isLoggedIn } = require('../../controller/authController')
const orderController = require('../../controller/orderController')

router.post('/users/orders', isLoggedIn, orderController.createOrder)

module.exports = router
