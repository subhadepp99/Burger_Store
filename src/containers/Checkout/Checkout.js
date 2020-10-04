import React,{Component} from 'react';
import {connect} from 'react-redux';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route,Redirect} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import * as actions from '../../store/actions';

class Checkout extends Component{

//     componentWillMount(){
// this.props.onInitPurchase();
//     }


//  state ={ingredients:null,
//      totalPrice:0
// }

// componentWillMount(){
//     const query=new URLSearchParams(this.props.location.search);
//     const ingredients={};
//     let price=0;
//     for(let param of query.entries()){
//         //['salad','1']{
//     //  {
//     //     salad :1,
//     //     cheese :1,
//     //     meat : 1,
//     //     bacon: 1
//     // }
// if(param[0]==='price')
// {
// price=param[1];
// }
// else{
//     ingredients[param[0]]= +param[1];
// }


//     }

//     this.setState({ingredients:ingredients,totalPrice:price});;
// }


checkoutCancelled =()=>{
this.props.history.goBack();
}
checkoutContinued =()=>{
    this.props.history.replace('/checkout/contact-data');
}


    render(){
let summary=<Redirect to="/" />;

if(this.props.ings){
    const purchasedRedirect=this.props.purchased ? <Redirect to ="/"/> :null;
    summary=(<div>
        {purchasedRedirect}
<CheckoutSummary ingredients={this.props.ings} 
            checkoutCancelled={this.checkoutCancelled}
             checkoutContinued={this.checkoutContinued} />
             <Route path={this.props.match.path +'/contact-data'} component={ContactData} /></div>
    );

}

return(
        // <div>
           summary
// <Route path={this.props.match.path +'/contact-data'} 
//render={(props)=>(<ContactData ingredients={this.props.ings} price={this.props.price} {...props}/>)}/> */}

        // </div>
    )
}
}

const mapStateToProps= state=>{
    return{
    ings:state.burgerBuilder.ingredients,
     purchased:state.order.purchased
    // price:state.burgerBuilder.totalPrice
    };
 };
    

//  const mapDispatchToProps =dispatch =>{
//      return{
//         onInitPurchase: ()=>dispatch(actions.purchaseInit())
//      };
//  }
    

export default connect(mapStateToProps) (Checkout);