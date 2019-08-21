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
      password: '',
      error: false,
      errorMessage : undefined
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    const registerUserUrl = 'http://0.0.0.0:5000/spirit/api/v1.0/login';
  
    fetch(registerUserUrl, {
      credentials : 'include',
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        return res.json()
          .then(json => {
            if (res.ok) {
              this.props.onLogin()
              this.props.history.push('/');
            } 
            else {
              this.setState({error: true, errorMessage : json.error })
            }
          })
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
    const {email, password, errorMessage} = this.state;
    return (
      <Modal error={errorMessage} formName={"Login"} id="login-modal">
        <div className={'login'}>
          <form onSubmit={this.handleSubmit}>
            <label>Email</label>
            <input
              name="email"
              type="email"
              value={email}
              onChange={this.handleChange}
            />
            <label>Password</label>
            <input
              name="password"
              type="password"
              value={password}
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
