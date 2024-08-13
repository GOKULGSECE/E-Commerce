import React, { useState, useEffect } from 'react';
import ProductCard from './componenets/productcard';
import Header from './componenets/Header';
import Menu from './componenets/Menu';
import { message } from 'antd';
import { products } from './constants';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, increment1, producttotalamount } from './redux/cartSilce';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);

  const cartArray = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const cardcount = useSelector((state) => state.cart.count);

  const countincrement = (item) => {
    if (!cartArray.find((items)=>item.id==items.id)) {
      dispatch(addProduct(item));
      dispatch(increment1(1));
      dispatch(producttotalamount(item))
      console.log(cartArray);
      message.success('Item added to the cart');
    } else {
      message.error('Already added');
    }
  };

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredProducts(products);<div className="0"> </div>
    } else {
      setFilteredProducts(
        products.filter((product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm]);

  const filterFunction = (category) => {
    if (category === 'all') {
      setFilteredProducts(products);
    } else {
      const filteredResults = products.filter(
        (item) => item.category === category
      );
      setFilteredProducts(filteredResults);
    }
  };

  return (
    <>
      <Header />
      <Menu
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterFunction={filterFunction}
        searchFunction={() => {}}
      />
      <div className="product-container">
        {filteredProducts.map((e) => (
          <ProductCard key={e.id} item={e} countincrement={countincrement} />
        ))}
      </div>
    </>
  );
};

export default App; 