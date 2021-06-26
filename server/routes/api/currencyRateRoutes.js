const router = require('express').Router();
const { getCurrencyRates } = require('../../controller/currencyRateController');

router.route('/daily_rates').get(getCurrencyRates);

module.exports = router;
