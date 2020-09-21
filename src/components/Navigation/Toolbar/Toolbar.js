import React from 'react';
import './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/Navigationitems';
import DrawerToggle from '../../Navigation/SideDrawer/DrawerToggle/DrawerToggle';

const toolbar=(props)=>(
    <header className="Toolbar">
        <DrawerToggle clicked={props.drawertoggleclicked}/>
       <Logo height="80%"/>
       <nav className="DesktopOnly">
       <NavigationItems/>
       </nav>
        
    </header>
   
);

export default toolbar;