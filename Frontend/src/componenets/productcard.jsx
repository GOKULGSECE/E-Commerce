import React from 'react';
import '../styles/App.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'

const ProductCard = ({ item, countincrement }) => {
  const cartItems = useSelector((state)=>state.cart.cartItems)
  const navigate = useNavigate();
  const handlenavi = ()=>{
    navigate('/cart')
  }
  const handlecartitem = (item)=>{
    navigate(`/products/${item.id}`,{state:{item}})
  }
  return (
    <>
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
          <span><b>Price:</b></span> {item.price}
        </p>
      </div>
      <div className="button">
        <button onClick={()=>handlecartitem(item)}>View Description</button>
        {!cartItems.find((items)=>items.id===item.id)?(<button onClick={() => countincrement(item)}>ADD TO CART</button>):<button onClick={(handlenavi)}>GO TO CART</button>}
      </div>
    </div>
    </>
    
  );
};

export default ProductCard;
