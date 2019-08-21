import React, { Component } from 'react';
import Map from './Map';
import Navbar from './Navbar';
import UserProfile from './UserProfile';
import MessageForm from './MessageForm';
import './App.css';
import { Route , withRouter} from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      session: {
        
      }
    };
  }
  
  getSession = () => {
    UserProfile().then((session)=>{
      this.setState({session: session })
    });
  }

  componentDidMount(){
    this.getSession()
  }
  render() {
    return (
      <div id="main">
        <Navbar session={this.state.session} onLogin={() => this.getSession()}  onlogOut={()=> this.getSession() } />
        <Map />
      </div>
    );
  }
}
export default withRouter(App);
