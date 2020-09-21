import React from 'react';
import './NavigationItems.css';
import Navigationitem from './NavigationItem/NavigationItem';

const navigationItems=(props)=>(
   <ul className="Navigationitems">
   <Navigationitem link="/" active>Burger Builder</Navigationitem>
   <Navigationitem link ="/">Checkout</Navigationitem>
   </ul>
);

export default navigationItems;