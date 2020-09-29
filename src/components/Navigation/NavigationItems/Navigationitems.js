import React from 'react';
import './NavigationItems.css';
import Navigationitem from './NavigationItem/NavigationItem';

const navigationItems=(props)=>(
   <ul className="Navigationitems">
   <Navigationitem link="/" >Burger Builder</Navigationitem>
   {/* <Navigationitem link ="/">Checkout</Navigationitem> */}
   <Navigationitem link ="/orders">Orders</Navigationitem>
   </ul>
);

export default navigationItems;