import React, { Component } from 'react';
import Video from './Video'
import Map from './Map';
import Navbar from './Navbar';
import UserProfile from './UserProfile';
import './App.css';
import { withRouter } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      session: {}
    };
  }

  getSession = () => {
    UserProfile().then(session => {
      this.setState({ session: session });
    });
  };
  
  componentDidMount() {
    this.getSession();
  }
  render() {
    const loggedIn = this.state.session['logged_in'];
    return (
      <div id="main">
        <Video/>
        <Navbar
          session={this.state.session}
          onLogin={() => this.getSession()}
          onlogOut={() => this.getSession()}
        />
        <Map session={this.state.session} loggedIn={loggedIn} />
      </div>
    );
  }
}
export default withRouter(App);
