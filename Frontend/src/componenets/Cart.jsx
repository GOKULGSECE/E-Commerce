import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./Header";
import "../styles/App3.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import {
  addcartitemsquantity,
  decreasecartitemquantity,
  productcountincrement,
  producttotalamount,
  producttotalamountdecrement,
  removecart
} from "../redux/cartSilce";
import { message } from "antd";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const productcount = useSelector((state) => state.cart.count);
  const totalprice = useSelector((state) => state.cart.totalamount);
  const dispatch = useDispatch();
  console.log(cartItems);
  const deliverycharge = () => {
    return Math.ceil(totalprice / 10);
    }
  const incrementcount = (item) => {
    dispatch(addcartitemsquantity(item));
    dispatch(productcountincrement(1));
    dispatch(producttotalamount(item));
  };
  const decrementcount = (item) => {
    if (item.quantity > 1) {
      dispatch(decreasecartitemquantity(item));
      console.log(item.quantity);
      dispatch(productcountincrement(-1));
      dispatch(producttotalamountdecrement(item));
    } else {
      message.error("No product to remove");
    }
  };
  const remove = (item)=>{
    dispatch(producttotalamountdecrement(item))
    dispatch(productcountincrement(-1));
    dispatch(removecart(item));
  }

  return (
    <>
      <Header/>
      <div className="main-container">
        <div>
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div
                className="product-container"
                style={{ marginTop: "120px" }}
                key={item.id}
              >
                <div className="card">
                  <img
                    src={item.image}
                    alt={item.description}
                    className="card-image"
                  />
                  <div className="card-content">
                    <p className="card-title">Title: {item.title}</p>
                    <p className="card-category">
                      <b>Category:</b> {item.category}
                    </p>
                    <p className="card-price">
                      <span>
                        <b>Price:</b>
                      </span>{" "}
                      {item.price}
                    </p>
                  </div>
                  <div className="button">
                    <button>Buy</button>
                    <button onClick={()=>remove(item)}>Remove from cart</button>
                  </div>
                  <div className="count_item_button">
                    <button onClick={() => decrementcount(item)}>-</button>
                    <h4>Count item:{item.quantity}</h4>
                    <button onClick={() => incrementcount(item)}>+</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Cart is Empty</p>
          )}
        </div>
        <div className="products-table">
          <h2>
            Cart Summary
            <p>
              <FontAwesomeIcon icon={faCartShopping} />
            </p>
          </h2>
          <h4>
            Products:<span>{productcount}</span>
          </h4>

          <h4>
            Delivery Charges:
            {totalprice.toFixed(2) < 500 ? (
              <p>Rs.{deliverycharge(totalprice)}</p>
            ) : (
              <p>Free</p>
            )}
          </h4>
          <h4>
            Total Amount:<span>Rs.{totalprice}</span> 
          </h4>
        </div>
      </div>
    </>
  );
};

export default Cart;
