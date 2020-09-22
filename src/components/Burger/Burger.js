import React from 'react';
import './Burger.css';
//import {withRouter} from 'react-router-dom';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
const burger =(props)=>{
    //console.log(props);

    let transformedingredients =Object.keys(props.ingredients).map(igKey =>{
        return [...Array(props.ingredients[igKey])].map((_,i)=>{
            return <BurgerIngredient key={igKey +i} type={igKey}/>
        });
    }).reduce((arr,el)=>{
        return arr.concat(el)
    },[]);

    if(transformedingredients.length===0){
        transformedingredients=<p>Please start adding ingredients!!</p>
    }
console.log(transformedingredients);
    return(
        <div className="Burger">
        <BurgerIngredient type="bread-top"/>
        {/* <BurgerIngredient type="cheese"/>
        <BurgerIngredient type="meat"/> */}
        {transformedingredients}
        <BurgerIngredient type="bread-bottom"/>

        </div>
    );
};
//export default withRouter(burger);
export default burger;