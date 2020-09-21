import React ,{Component} from 'react';
import axios from '../../axios-orders';
import Aux from '../../hoc/Auxs';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

const INGREDIENT_PRICES={
    salad :0.5,
    cheese : 0.4,
    meat : 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    state={
        ingredients :{
            salad:0,
            bacon:0,
            cheese:0,
            meat:0
        },
        totalPrice: 4,
        purchasable:false,
        purchasing:false,
        loading:false
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

        this.setState({purchasable:sum>0});
    }

addIngredientHandler =(type)=>{
   const oldCount=this.state.ingredients[type];
    const updatedCounted=oldCount +1;
     const updatedIngredients ={
        ...this.state.ingredients
         };
                    updatedIngredients[type]=updatedCounted;
                    const priceAddition =INGREDIENT_PRICES[type];
                    const oldPrice =this.state.totalPrice;
                    const newPrice=oldPrice+priceAddition;
                    this.setState({totalPrice:newPrice,ingredients:updatedIngredients}); 
this.updatePurchasedState(updatedIngredients);

                    }

                    removeIngredientHandler =(type)=>{
                        const oldCount=this.state.ingredients[type];
                        if(oldCount <=0){
                            return;
                        }

                        const updatedCounted=oldCount -1;
                        const updatedIngredients ={
                        ...this.state.ingredients
                        };
                        updatedIngredients[type]=updatedCounted;
                        const priceDeduction =INGREDIENT_PRICES[type];
                        const oldPrice =this.state.totalPrice;
                        const newPrice=oldPrice-priceDeduction;
                        this.setState({totalPrice:newPrice,ingredients:updatedIngredients}); 
                        this.updatePurchasedState(updatedIngredients);
                    }

                    purchaseHandler=()=>{

                        this.setState({purchasing:true});
                    }

                    purchaseCancelHandler=()=>{

                        this.setState({purchasing:false});
                    }

                    purchaseContinueHandler=()=>{
                        this.setState({loading:true});
                        const order={
                            ingredients:this.state.ingredients,
                            price:this.state.totalPrice,
                            customer:{
                                name:'Depp',
                                address:{
                                    street:'Test',
                                    zipCode:'41352',
                                    country:'India'
                                },
                                email:'test@test.com'
                            },
                            deliveryMethod :'fastest'
                        }

                        axios.post('/orders.json',order)
                        .then(response => {
                            this.setState({loading:false,purchasing:false});
                            console.log(response);})
                        .catch(err=>{
                            console.log(err);
                            this.setState({loading:false,purchasing:false});
                        } );

                        //alert('You Continue');
                    }

    render(){


const disabledInfo={
    ...this.state.ingredients
};
for(let key in disabledInfo){
    disabledInfo[key]=disabledInfo[key] <=0
}
let orderSummary=<OrderSummary 
purchaseCanceled={this.purchaseCancelHandler}
purchasedContinue={this.purchaseContinueHandler}
totalprice={this.state.totalPrice}
        ingredients={this.state.ingredients}/>;

         if(this.state.loading){
             orderSummary=<Spinner />;
         }
        return (
<Aux>
    <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
        {orderSummary}
    </Modal>
   <Burger ingredients={this.state.ingredients}/>
    <BuildControls 
    ingredientAdded={this.addIngredientHandler} 
    ingredientRemoved={this.removeIngredientHandler}
   disabled= {disabledInfo}
   price={this.state.totalPrice}
   ordered={this.purchaseHandler}
   purchasable ={this.state.purchasable}
    />
</Aux>
        );
    }
}

export default BurgerBuilder;