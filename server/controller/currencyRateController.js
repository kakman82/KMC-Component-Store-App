const tcmbdoviz = require('tcmb-doviz')

//* @desc: Get daily currency rates
//* @route: GET /api/daily_rates
//* @access: Public
exports.getCurrencyRates = async (req, res) => {
  try {
    const data = await tcmbdoviz.getData()
    if (data) {
      const currDate = data.date
      const exchanges = data.exchanges

      res.status(200).json({
        success: true,
        currDate: currDate,
        exchanges: exchanges,
      })
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      errDetails: error,
    })
  }
}
