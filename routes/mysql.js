const {Router} = require ('express');
const router = Router();

const { getGenderCountsMySQL , getPaymentMethodCounts , getTop5CountriesByPurchaseCount} = require('../controllers/mysql')

router.get('/genders', getGenderCountsMySQL)
router.get('/payments', getPaymentMethodCounts)
router.get('/countries', getTop5CountriesByPurchaseCount)




module.exports = router