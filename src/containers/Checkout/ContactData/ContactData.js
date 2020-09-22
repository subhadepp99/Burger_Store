import React,{Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {

    state={
        name:'',
        email:'',
        address :{
            street :'',
            postal_code:''
        },
        loading:false
    }

    oderderHandler=(event)=>{
        event.preventDefault();
        console.log(this.props.ingredients);
          this.setState({loading:true});
                        const order={
                            ingredients:this.props.ingredients,
                            price:this.props.price,
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
                            this.setState({loading:false});
                            console.log(response);
                            this.props.history.push('/');
                        })
                        .catch(err=>{
                            console.log(err);
                            this.setState({loading:false});
                        } );
    }
    render(){
        let form=( <form>
            <input className="Input" type="text" name="name" placeholder="Your Name" />
            <input className="Input" type="email" name="email" placeholder="Your email" />
            <input className="Input" type="text" name="street" placeholder="Your street" />
            <input className="Input" type="text" name="Postal" placeholder="Your postal" />
          
<Button btnType="Success" clicked={this.oderderHandler}>Order</Button>
        </form>);
        if(this.state.loading){
            form=<Spinner />;
        }
        return (
            <div className="ContactData">
                <h4>Enter Your ContactData</h4>
               {form}
            </div>

        );
    }
}


export default ContactData;