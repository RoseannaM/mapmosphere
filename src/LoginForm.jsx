import React, { Component } from 'react';
import Modal from './Modal';
import {
  withRouter,
  Route,
  Link,
  BrowserRouter as Router
} from 'react-router-dom';

class LoginFormView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    const registerUserUrl = 'http://0.0.0.0:5000/spirit/api/v1.0/login';
  
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

  handleChange = e => {
    if(e.target.name === "email"){
      this.setState({ email: e.target.value });
    }
    if(e.target.name === "password"){
      this.setState({ password: e.target.value });
    }
  };

  render() {
    return (
      <Modal formName={"Login"} id="login-modal">
        <div className={'login'}>
          <form onSubmit={this.handleSubmit}>
            <label>Email</label>
            <input
              name="email"
              type="email"
              value={this.props.email}
              onChange={this.handleChange}
            />
            <label>Password</label>
            <input
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
            <input type="submit" value="Submit" />
          </form>
        </div>
      </Modal>
    );
  }
}
export default withRouter(LoginFormView);
