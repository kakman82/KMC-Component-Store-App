const router = require('express').Router()
const { isLoggedIn } = require('../../controller/authController')
const orderController = require('../../controller/orderController')

router.post('/users/orders', isLoggedIn, orderController.createOrder)
// get one user orders
router.get('/users/orders/:id', isLoggedIn, orderController.getUserOrders)

module.exports = router
