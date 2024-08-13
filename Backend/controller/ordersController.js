const Orders = require('../models/ordersModels');
const Cart = require('../models/cartModels');
const Users = require('../models/usermodel');

const createOrders = async (req, res) => {
    const order = req.body;
    const userdetails = req.user;

    try {
        const user_check = await Cart.findOne({ user_id: userdetails.user_id });
        console.log(user_check)
        const email_check = await Users.findOne({id:userdetails.user_id}) 
        if (!user_check) {
            return res.status(400).json({ message: "User not found" });
        }
        // const cart = await Cart.findOne({ user_id: userdetails.user_id });
        // if (!cart || cart.products.length === 0) {
        //     return res.status(400).json({ message: "Cart is empty" });
        // }
        const new_order = new Orders({
            customer_name: order.customer_name,
            address: order.address,
            phone: order.phone,
            products: user_check.products,
            email: email_check.email 
        });
        await new_order.save();
        res.status(200).json({ msg: "Order has been created successfully", order: new_order });

    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

const getOrders = async (req, res) => { 
};

module.exports = { getOrders, createOrders };
