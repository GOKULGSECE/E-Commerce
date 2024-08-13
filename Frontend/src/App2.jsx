import {BrowserRouter,Route,Routes} from 'react-router-dom';
import React from 'react'
import Cart from './componenets/Cart';
import Header from './componenets/Header';
import App from './App';
import ProductDescription from './componenets/productDetails';
import Login from './pages/login';
const App2 = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/login" element={<Login />} />
        <Route path='/' element={<Header></Header>}></Route>
        <Route path='/products' element={<App></App>}></Route>
        <Route path='/cart' element={<Cart></Cart>}></Route>
        <Route path='/products/:id' element={<ProductDescription/>}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App2;