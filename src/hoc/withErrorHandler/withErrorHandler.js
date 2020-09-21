import React,{Component} from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxs';

const withErrorHandler =(WrappedComponent,axios)=>{
    return class extends Component {
        state={
            error:null
        };
componentWillMount(){
    //clearing the error of the prev req
   this.reqInterceptor =axios.interceptors.request.use(req=>{
        this.setState({error:null});
        return req;
    })
    this.resInterceptor= axios.interceptors.response.use(res=>res,error=>{
this.setState({error:error});

    })
}


//when no longer a component is required and so as to release memory and avoid memory leakage
componentWillUnmount(){
    console.log('will unmount',this.reqInterceptor,this.resInterceptor);
axios.interceptors.request.eject(this.reqInterceptor);
axios.interceptors.response.eject(this.resInterceptor);
}

errorConfirmedhandler=()=>{
    this.setState({error:null});
}

        render(){
            return(
                <Aux>
                <Modal 
                show={this.state.error}
                modalClosed={this.errorConfirmedhandler}>{this.state.error? this.state.error.message:null}</Modal>
                <WrappedComponent {...this.props} />
                </Aux>
            
            )
        }
    } 
}


export default withErrorHandler;
