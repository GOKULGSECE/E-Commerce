const mongoose = require('mongoose');

function addDays(days) {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date;
}

const ordersModels = new mongoose.Schema({
    order_id: { 
        type: String, 
        required: true 
    },
    customer_name: {
        type: String,
    },
    address: {
        type: String,
    },
    phone: {
        type: Number
    },
    products: [{
        _id: false,
        product_id: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    ordered_date: {
        type: Date,
        default: Date.now
    },
    estimated_date: {
        type: Date,
        default: () => addDays(10)
    },
    email: {
        type: String,
    }
});

const orders = mongoose.model('orders', ordersModels);
module.exports = orders;
