
import React,{Component} from 'react';
import  './Layout.css' ;
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';


import Aux from '../Auxs';

class Layout extends Component {

    state={
        showSideDrawer:false
    };
sideDrawerClosedhandler=()=>{
this.setState({showSideDrawer:false});
}
sideDrawerTogglehandler=()=>{
    this.setState((prevState)=>{
      return  {showSideDrawer:!this.state.showSideDrawer}
    });
    }
    


    render(){
        return(
            <Aux>
            <Toolbar  drawertoggleclicked={this.sideDrawerTogglehandler} />
            <SideDrawer closed={this.sideDrawerClosedhandler}
            open={this.state.showSideDrawer}
            
           />
    
    <main className="Content">
        {this.props.children}
    </main>
    </Aux>
        )
    }
}
   

export default Layout;