import React from 'react';

import burgerLogo from '../../assests/Images/132 burger-logo.png';
import './Logo.css';

const logo =(props)=>(
    <div className="Logo" style={{height:props.height}}>
<img src={burgerLogo} alt="myBurger" />
    </div>
);


export default logo;