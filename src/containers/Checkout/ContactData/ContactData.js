import React,{Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import './ContactData.css';

class ContactData extends Component {

    state={
        name:'',
        email:'',
        address :{
            street :'',
            postal_code:''
        }
    }
    render(){
        return (
            <div className="ContactData">
                <h4>Enter Your ContactData</h4>
                <form>
                    <input className="Input" type="text" name="name" placeholder="Your Name" />
                    <input className="Input" type="email" name="email" placeholder="Your email" />
                    <input className="Input" type="text" name="street" placeholder="Your street" />
                    <input className="Input" type="text" name="Postal" placeholder="Your postal" />
                  
<Button btnType="Success">Order</Button>
                </form>
            </div>

        );
    }
}


export default ContactData;