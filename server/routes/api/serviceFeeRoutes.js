const express = require('express')
const serviceFeeController = require('../../controller/serviceFeeController')

const router = express.Router()

router
  .route('/serviceFee')
  .post(serviceFeeController.createServiceFee)
  .get(serviceFeeController.getServiceFee)

module.exports = router
