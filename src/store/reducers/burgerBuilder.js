import * as actionTypes from '../actions/actionTypes';

import {updateObject} from '../utility';

const initialState={
    ingredients :null,
    // {
    //     salad:0,
    //     bacon:0,
    //     meat:0,
    //     cheese:0
    // },
    totalPrice: 4,
    error:false
    
};


const INGREDIENT_PRICES={
    salad :0.5,
    cheese : 0.4,
    meat : 1.3,
    bacon: 0.7
};

const reducer =(state=initialState,action)=>{
switch(action.type){
                case actionTypes.ADD_INGREDIENT:
                    const updatedIngredient ={
                        
                    }
                    const updatedIngredients =updateObject(state.ingredients);
                    return{
            ...state,
            ingredients:{
                ...state.ingredients,
                [action.ingredientName]:state.ingredients[action.ingredientName] +1
            },
            totalPrice:state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
                    };
                case actionTypes.REMOVE_INGREDIENT:
                    return{
                        ...state,
                        ingredients:{
                            ...state.ingredients,
                            [action.ingredientName]:state.ingredients[action.ingredientName] -1
                        },
                        totalPrice:state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
                } ;

                case actionTypes.SET_INGREDIENTS:
                    return{
                        ...state,
                        ingredients:{
                            
                                salad :action.ingredients.salad,
                                cheese :action.ingredients.cheese,
                                bacon :action.ingredients.bacon,
                                meat :action.ingredients.meat
                            
                            
                        },
                        totalPrice:4,
                        error:false
                    };

                    case actionTypes.FETCH_INGREDIENTS_FAILED:
                        return{
                            ...state,
                            error:true
                        };
        default:
        return state;

}

};

export default reducer;

