import React,{Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {

    state={
        orderForm:{
            
                name:{ elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Name'
                },
                value:'',
                validation:{
                    required:true
                },valid:false,touched:false
                },
                street:{ elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Street'
                },
                value:'',
                validation:{
                    required:true
                },valid:false,touched:false
                },
                zipCode:{ elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Pincode',
                    minLength:5,
                    maxLength:5
                },
                value:'',
                validation:{
                    required:true
                },valid:false,touched:false
                },
                country:{ elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Country'
                },
                value:'',
                validation:{
                    required:true
                },valid:false,touched:false
                },
                email:{ elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Your email'
                },
                value:'',
                validation:{
                    required:true
                },valid:false,touched:false
                },
                deliveryMethod :{
                elementType:'select',
                elementConfig:{
                    options:[
                        {value:'fastest',displayValue:'Fastest'},
                    {value:'cheapest',displayValue:'Cheapest'}
                ]
                },
                value:'',valid:true, validation:{ }
                }
            },
        
        // name:'',
        // email:'',
        // address :{
        //     street :'',
        //     postal_code:''
        // },
        loading:false,
        formIsValid:false
    }

    oderderHandler=(event)=>{
        event.preventDefault();
        console.log(this.props.ingredients);
          this.setState({loading:true});
const formData={};
for(let formElementIdentifier in this.state.orderForm){
    formData[formElementIdentifier]= this.state.orderForm[formElementIdentifier].value;
}

                        const order={
                            ingredients:this.props.ingredients,
                            price:this.props.price,
                           orderData:formData
                            
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



    checkValidity(value,rules){
        let isValid=false;
        if (!rules){
            return true;
        }

if(rules.required){
    isValid =value.trim() !== ''  && isValid;

}


if(rules.minLength){
    isValid=value.length>= rules.minLength && isValid
}
if(rules.maxLength){
    isValid=value.length<= rules.maxLength && isValid
}
return isValid;    
}

inputChangedHandler=(event,inputIdentifier)=>{
//console.log(event.target.value);
const updatedOrderForm={
    ...this.state.orderForm
}

const updatedFormELement={...updatedOrderForm[inputIdentifier]};
updatedFormELement.value=event.target.value;
updatedFormELement.valid=this.checkValidity(updatedFormELement.value,updatedFormELement.validation);
updatedFormELement.touched=true;

updatedOrderForm[inputIdentifier]=updatedFormELement;
console.log(updatedFormELement);

let formIsValid=true;
for(let inputIdentifier in updatedOrderForm)
{
    formIsValid =updatedOrderForm[inputIdentifier].valid && formIsValid;
}

this.setState({orderForm:updatedOrderForm,formIsValid:formIsValid});


}

    render(){

const formElementsArray=[];
for(let key in this.state.orderForm){
    formElementsArray.push({
        id:key,
        config:this.state.orderForm[key],
    
    })
}




        let form=( <form onSubmit={this.oderderHandler}>
            {/* <Input elementType="..." elementconfig ="..." value="..." /> */}
         
            {formElementsArray.map(formElement=>(
                <Input key={formElement.id} elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                inValid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.touched}
                changed={(event)=>this.inputChangedHandler(event,formElement.id)} />
            ))}
         
          
<Button btnType="Success" disabled={!this.state.formIsValid} clicked={this.oderderHandler}>Order</Button>
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