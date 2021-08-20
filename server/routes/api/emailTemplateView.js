//* FOR EMAIL TEMPLATE VIEW TESTING;
const express = require('express')
const router = express.Router()
const { deliveryAddress, order } = require('../../utils/emailTestData')

router.get('/email', (req, res) => {
  res.send('Email Test Page')
})

router.get('/email/welcome', (req, res) => {
  res.render('email/welcome')
})

router.get('/email/orderTemplate', (req, res) => {
  res.render('email/order', { deliveryAddress: deliveryAddress, order: order })
})

module.exports = router
