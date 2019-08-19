import React, { Component } from 'react';
import Modal from './Modal';
import {
  withRouter,
  Route,
  Link,
  BrowserRouter as Router
} from 'react-router-dom';

class LogOutFormView extends Component {
 
  handleLogout = e => {
    e.preventDefault();
    const registerUserUrl = 'http://0.0.0.0:5000/spirit/api/v1.0/logout';
  
    fetch(registerUserUrl, {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(response => {
        alert(JSON.stringify(response));
        this.props.history.push('/');
      })
      .catch(error => {
        console.error('Error:', error)
        alert(error)
      });
  };

  render() {
    return (
        <form onSubmit={this.handleLogout}>
        <input type="submit" value="Submit" name="logout" />
      </form>
    );
  }
}
export default withRouter(LogOutFormView);
