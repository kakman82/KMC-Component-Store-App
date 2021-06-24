const router = require('express').Router()
const {getProducts} = require('../../controller/productController')

router.route('/products/:search_token').get(getProducts)

module.exports = router