const router = require('express').Router()
const {
  isLoggedIn,
  isUserRoleAllowed,
} = require('../../controller/authController')
const orderController = require('../../controller/orderController')

router.post('/users/orders', isLoggedIn, orderController.createOrder)
// get one user orders
router.get('/users/orders/:id', isLoggedIn, orderController.getUserOrders)
// get all user orders for admin or personel roles
router.get(
  '/users/orders',
  isLoggedIn,
  isUserRoleAllowed('admin', 'personel'),
  orderController.getAllOrders
)

router.patch(
  '/users/orders',
  isLoggedIn,
  isUserRoleAllowed('admin', 'personel'),
  orderController.updateOrderStatus
)

module.exports = router
