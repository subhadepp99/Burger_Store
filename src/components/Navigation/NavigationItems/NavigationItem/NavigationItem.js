import React from 'react';
import  {NavLink} from 'react-router-dom';
import './NavigationItem.css';

const navigationItem=(props)=>(
  
<li  className="Navigationitem">
    {/* <a href={props.link} className={props.active ? "active" :null}>{props.children}</a> */}

    <NavLink to={props.link} exact activeClassName="active">{props.children}</NavLink>
    </li>
   
);

export default navigationItem;