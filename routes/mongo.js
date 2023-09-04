/*
    Post Route

    host + /api/mongo

*/

const {Router} = require ('express');
const router = Router();

const { getDocumentsAndCountGenders , getTop5Countries , getPaymentMethodCounts} = require('../controllers/mongo')


router.get('/genders', getDocumentsAndCountGenders)

router.get('/countries', getTop5Countries)

router.get('/payments', getPaymentMethodCounts)



module.exports = router