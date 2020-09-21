import React from 'react';
import Logo from '../../Logo/Logo';
import  './SideDrawer.css';

import Backdrop from '../../UI/BackDrop/BackDrop';
import Aux from '../../../hoc/Auxs';

import NavigationItems from '../NavigationItems/Navigationitems';

const sideDrawer=(props)=>{
let attachedClasses =["SideDrawer","Close"];
if(props.open){
     attachedClasses =["SideDrawer","Open"];
}
    return(
        <Aux>
<Backdrop show={props.open} clicked={props.closed}/>
        <div className={attachedClasses.join(' ')}>
<Logo  height="11%" />
<nav>
    <NavigationItems/>
</nav>
        </div>
        </Aux>
        
    );
};
  
   


export default sideDrawer;