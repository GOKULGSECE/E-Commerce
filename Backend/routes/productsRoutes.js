const express = require('express')
const router = express.Router();
const {getProducts,createProducts} = require('../controller/productscontroller')
const auth = require('../middleware/auth')

router.get('/',getProducts)
router.post('/',createProducts);



module.exports = router