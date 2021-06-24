const axios = require('axios')
require('dotenv').config()


//* @desc: Get all products by given search_token from req.param
//* @route: GET /api/products/:token
//* @access: Public
exports.getProducts = async (req, res) => {
    try {
        const apiUrl = 'http://api.arrow.com/itemservice/v4/en/search/token'
        const apiResponse = await axios.get(apiUrl, {
            params: {
                search_token: req.params.search_token,
                login: process.env.API_LOGIN,
                apikey: process.env.API_KEY
            }
        })
        const apiProducts = apiResponse.data.itemserviceresult.data[0].PartList;
        res.status(200).json({
            success: true,
            products: apiProducts.length,
            apiProducts: apiProducts
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            errDetails: error
        })
        
    }
}