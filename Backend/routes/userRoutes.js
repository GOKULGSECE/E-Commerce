const express = require('express');
const router = express.Router();
const { getUser, postUser, updateUser } = require('../controller/userController');
const { createcart, getCartItems,deleteCart} = require('../controller/cartController');
const {createOrders, getOrders} = require('../controller/ordersController')
const auth = require('../middleware/auth');
router.post('/login', getUser);
router.post('/signup', postUser);
router.put('/update', updateUser);
router.post('/cart', auth, createcart);
router.get('/cart/getcart', auth,getCartItems); 
router.delete('/cart/deleteCart/:id',auth,deleteCart);
router.get('/cart/getOrders',auth,getOrders);
router.post('/cart/createorders',auth,createOrders)
module.exports = router;
