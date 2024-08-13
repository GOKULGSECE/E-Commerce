const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user_id: {
        type: String,
        unique: true,
        required: true,
    },
    products: [{
        _id:false,
        product_id: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        }}
    ]
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
