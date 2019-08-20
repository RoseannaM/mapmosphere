import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  withRouter,
  Redirect,
  Route,
  Link,
  BrowserRouter as Router
} from 'react-router-dom';
import UserProfile from './UserProfile';
import RegistrationForm from './RegistrationForm';
import MessageForm from './MessageForm';
import LoginForm from './LoginForm';
import MessagePopup from './MessagePopup';

export default class Navbar extends Component {
  constructor(props){
    super(props);
    this.state = {
      error : ""
    }
  }
  handleLogout = e => {
    e.preventDefault();
    const registerUserUrl = 'http://0.0.0.0:5000/spirit/api/v1.0/logout';

    fetch(registerUserUrl, {
      credentials : 'include',
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(response => {
        UserProfile();
        this.props.onlogOut()
        this.props.history.push('/');
      })
      .catch(error => {
        console.error('Error:', error)
      });
  };
  
  render() {
    const {onLogin, onLogout, error} = this.props;
    const loggedOut = window.loggedOut;
    return (
      <div>
        <header className="navbar navbar-expand navbar-dark flex-column flex-md-row bd-navbar">
          <div className="navbar-nav-scroll">
            <ul className="navbar-nav bd-navbar-nav flex-row">
              <span>
                <li className="nav-item">
                  <Link to="/message"> New Message </Link>
                </li>
              </span>
            </ul>
          </div>
          <ul className="navbar-nav flex-row ml-md-auto d-none d-md-flex">
            {(loggedOut && (
              <div className="login-btns">
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
              </div>
            )) || (
              <li>
                <Link to="/logout" onClick={this.handleLogout}>
                  Logout
                </Link>
              </li>
            )}
          </ul>
        </header>
        <Route path="/register" component={RegistrationForm} />
        <Route path="/message" component={MessageForm} />
        <Route path="/logout" />
        <Route
          path="/login"
          render={() => <LoginForm onLogin={onLogin} />}
        />
      </div>
    );
  }
}