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
      loggedOut : true
    };
  }
  
  getMe = () => {
    UserProfile().then((loggedOut)=>{
      this.setState({loggedOut: loggedOut })
    });
  }
  componentDidMount(){
    this.getMe()
  }
  render() {
    return (
      <div id="main">
        <Navbar onLogin={() => this.getMe()}  onlogOut={()=> this.getMe() } />
        <Map />
      </div>
    );
  }
}
export default withRouter(App);
