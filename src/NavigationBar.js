// NavigationBar.js
import React from 'react';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
  return (
    // <header>
    <nav>
      <div id='navbar'>
      <Link className= 'link' to="/">Home</Link> | <Link className='link' to="/about">About</Link>
      </div>
    </nav>
    // </header>
  );
};


export default NavigationBar;