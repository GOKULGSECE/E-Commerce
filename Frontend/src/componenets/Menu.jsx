import React from 'react';
import "../styles/index.css";

const Menu = ({ searchTerm, setSearchTerm, filterFunction, searchFunction }) => {
  return (
    <div className="menu">
      <input 
        type='text' 
        placeholder='Search here' 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
      />
      <button onClick={searchFunction}>Search</button><br></br>
      <button onClick={() => filterFunction('men\'s clothing')}>Men's Clothing</button>
      <button onClick={() => filterFunction('women\'s clothing')}>Women's Clothing</button>
      <button onClick={() => filterFunction('electronics')}>Electronics</button>
      <button onClick={() => filterFunction('jewelery')}>Jewelery</button>
      <button onClick={() => filterFunction('all')}>All</button>
    </div>
  );
}

export default Menu;
