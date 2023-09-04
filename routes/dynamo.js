/*
    Post Route

    host + /api/mongo

*/

const {Router} = require ('express');
const router = Router();

const { getDocumentsAndCountGenders , getPaymentMethodCounts , getTop5Countries} = require('../controllers/dynamo')


router.get('/genders', getDocumentsAndCountGenders)
router.get('/payments', getPaymentMethodCounts)
router.get('/countries', getTop5Countries)





module.exports = router