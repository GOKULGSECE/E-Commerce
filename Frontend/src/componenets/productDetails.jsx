import React from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import '../styles/productdescription.css';

const ProductDescription = () => {
  const location = useLocation();
  const { item } = location.state;

  return (
    <>
    <div className="product_description_main">
      <Header />
      <div className="product_description">
        <img src={item.image} alt={item.description} />
        <div className="product_content">
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <p>$:{item.price}</p>
          <p>Rating: {item.rating.rate}</p>
          <p>Product Available: {item.rating.count}</p>
          <button>BUY NOW</button>
        </div>
      </div>
    </div>
    </>
  );
};

export default ProductDescription;
