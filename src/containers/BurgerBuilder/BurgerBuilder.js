import React ,{Component} from 'react';
import {connect} from 'react-redux';
import axios from '../../axios-orders';
import Aux from '../../hoc/Auxs';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from "../../store/actions";


class BurgerBuilder extends Component {
    state={
        // ings :null,
        
        // purchasable:false,
        purchasing:false,
        loading:false,
        error:false
    }

componentDidMount(){
    // console.log(this.props);
    // axios.get('https://react-my-burger-fb977.firebaseio.com/ingredients.json')
    // .then(res=>{
    //     this.setState({ingredients:res.data})
    // })
    // .catch(error=>{
    //     this.setState({error:true});
    // });
}


    updatePurchasedState(ingredients){
        // const ingredients={
        //     ...this.state.ingredients
        // };
        const sum = Object.keys(ingredients).map(igKey=>{
            return ingredients[igKey];
        }).reduce((sum,el)=>{
            return sum  +el;
        },0);

        //this.setState({purchasable:sum>0});
    return sum>0;
    }

// addIngredientHandler =(type)=>{
//    const oldCount=this.state.ingredients[type];
//     const updatedCounted=oldCount +1;
//      const updatedIngredients ={
//         ...this.state.ingredients
//          };
//                     updatedIngredients[type]=updatedCounted;
//                     const priceAddition =INGREDIENT_PRICES[type];
//                     const oldPrice =this.state.totalPrice;
//                     const newPrice=oldPrice+priceAddition;
//                     this.setState({totalPrice:newPrice,ingredients:updatedIngredients}); 
// this.updatePurchasedState(updatedIngredients);

//                     }

//                     removeIngredientHandler =(type)=>{
//                         const oldCount=this.state.ingredients[type];
//                         if(oldCount <=0){
//                             return;
//                         }

//                         const updatedCounted=oldCount -1;
//                         const updatedIngredients ={
//                         ...this.state.ingredients
//                         };
//                         updatedIngredients[type]=updatedCounted;
//                         const priceDeduction =INGREDIENT_PRICES[type];
//                         const oldPrice =this.state.totalPrice;
//                         const newPrice=oldPrice-priceDeduction;
//                         this.setState({totalPrice:newPrice,ingredients:updatedIngredients}); 
//                         this.updatePurchasedState(updatedIngredients);
//                     }

                    purchaseHandler=()=>{

                        this.setState({purchasing:true});
                    }

                    purchaseCancelHandler=()=>{

                        this.setState({purchasing:false});
                    }

                    purchaseContinueHandler=()=>{
                        this.props.history.push('/checkout');

                        // //alert('You Continue');
                        // const queryParams=[];
                        // for(let i in this.state.ingredients){
                        //     queryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.state.ingredients[i]));
                        // }
                        // queryParams.push('price='+this.state.totalPrice);
                        // const querystring=queryParams.join('&');
                        // this.props.history.push({
                        //     pathname:'/checkout',
                        //     search:'?'+querystring
                        // });
                    }

    render(){


const disabledInfo={
    ...this.props.ings
};
for(let key in disabledInfo){
    disabledInfo[key]=disabledInfo[key] <=0
}

let orderSummary=null; 
let burger=this.state.error? <p>Ingredients can't be loaded</p>:<Spinner />;
if(this.props.ings){
    burger=(<Aux>
        <Burger ingredients={this.props.ings}/>
        <BuildControls 
        ingredientAdded={this.props.onIngredientAdded} 
        ingredientRemoved={this.props.onIngredientRemoved}
        disabled= {disabledInfo}
        price={this.props.price}
        ordered={this.purchaseHandler}
        purchasable ={this.updatePurchasedState(this.props.ings)}
        /></Aux>);
        orderSummary=<OrderSummary 
purchaseCanceled={this.purchaseCancelHandler}
purchasedContinue={this.purchaseContinueHandler}
totalprice={this.props.price}
        ingredients={this.props.ings}/>;
}
if(this.state.loading){
    orderSummary=<Spinner />;
}

        return (
<Aux>
    <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
        {orderSummary}
    </Modal>
   {burger}
</Aux>
        );
    }
}

const mapStateToProps= state=>{
return{
ings:state.ingredients,
price:state.totalPrice
};
};

const mapDispatchToProps= dispatch=>{
return{
onIngredientAdded:(ingName)=>dispatch({type:actionTypes.ADD_INGREDIENT,ingredientName:ingName}),
onIngredientRemoved:(ingName)=>dispatch({type:actionTypes.REMOVE_INGREDIENT,ingredientName:ingName})
};
};

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));