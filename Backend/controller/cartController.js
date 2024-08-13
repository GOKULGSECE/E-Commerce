const Cart = require('../models/cartModels');
const Product = require('../models/productModels')
const mongoose=  require('mongoose')

const createcart = async (req, res) => {
    const { user_id, products } = req.body;

    try {
        let cart = await Cart.findOne({ user_id });

        if (!cart) {
            cart = new Cart({
                user_id,
                products: [
                    {
                        product_id: products.product_id,
                        quantity: products.quantity
                    }
                ]
            });
        } else {
            const product = cart.products.find(
                (prod) => prod.product_id === products.product_id
            );

            if (product) {
                product.quantity += products.quantity;
            } else {
                cart.products.push({
                    product_id: products.product_id,
                    quantity: products.quantity
                });
            }
        }
        await cart.save();

        res.status(200).json({ msg: "Cart created/updated successfully", cart });
    } catch (e) {
        res.status(500).json({ msg: "Internal server error, try again", error: e.message });
    }
};

const getCartItems = async (req, res) => {
    console.log(req.user)
   const user_id = req.user.user_id;
   console.log(user_id)
    if (!user_id ) {
        return res.status(400).json({ message: "Invalid user ID" });
    }
    try {
        const cart = await Cart.findOne({ user_id: user_id });
        
        if (!cart) {
            return res.status(404).json({ message: "Cart not found for the specified user" });
        }
        // console.log(cart);
        const cartItems = await Promise.all(
            cart.products.map(async (product) => {
                try {
                    const productDetails = await Product.findOne({id:product.product_id});
                    
                    if (!productDetails) {
                        return res.status(404).json("NO PRODUCT WITH ID");  
                    }
                    return {
                        product_id: productDetails.id,
                        title: productDetails.title,
                        price: productDetails.price,
                        image: productDetails.image,
                        quantity: product.quantity,
                        subtotal:(productDetails.price)*(product.quantity)
                    };
                } catch (err) {
                    console.error(`Error fetching product details for product ID: ${product.product_id}`, err);
                    return null;
                }
            })
        );
        return res.status(200).json({ cartItems: cartItems });
    } catch (error) {
        console.error(`Error fetching cart items for user ID: ${id}`, error);
        return res.status(500).json({ message: "Internal server error", error });
    }
};

const deleteCart = async (req,res)=>{

    const user_id = req.user.user_id;
    const productID = req.params.id;
    const cart  = await Cart.findOne({user_id});
    if (!cart) {
        return res.status(404).json({ message: "Cart not found for the specified user"})
    }
    const isproductVaild = cart.products.find((product)=>productID === product.product_id)
    if (!isproductVaild) {
        return res.status(404).json({ message: "Product not found in cart" });
    }
    if(cart.products.length <=1)
        {
            await Cart.deleteOne({user_id});
            return res.status(200).json({ message: "Cart deleted successfully" });
        }
        else{
            cart.products = cart.products.filter((product) => product.product_id !== productID);
            await cart.save();
            return res.status(200).json({ message: "Product deleted from cart successfully" });
        }
}
module.exports = { createcart, getCartItems,deleteCart};
