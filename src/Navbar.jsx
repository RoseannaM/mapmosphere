import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  withRouter,
  Redirect,
  Route,
  Link,
  BrowserRouter as Router
} from 'react-router-dom';
import RegistrationForm from './RegistrationForm';
import MessageForm from './MessageForm';
import LoginForm from './LoginForm';
import MessagePopup from './MessagePopup';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ''
    };
  }
  handleLogout = e => {
    e.preventDefault();
    const registerUserUrl = 'http://0.0.0.0:5000/spirit/api/v1.0/logout';

    fetch(registerUserUrl, {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        return res.json().then(json => {
          if (res.ok) {
            this.props.onlogOut();
            this.props.history.push('/');
          } else {
            this.setState({ error: true, errorMessage: json.error });
          }
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  render() {
    const { onLogin, session } = this.props;
    const logged_in = session.logged_in;
    return (
      <div>
        <header className="navbar navbar-expand navbar-dark flex-column flex-md-row bd-navbar">
          <div className="navbar-nav-scroll">
            <ul className="navbar-nav bd-navbar-nav flex-row">
              {logged_in && (
                <li className="nav-item">
                  <Link to="/message"> New Message </Link>
                </li>
              )}
            </ul>
          </div>
          <ul className="navbar-nav flex-row ml-md-auto d-none d-md-flex">
            {logged_in || (
              <div className="login-btns">
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
              </div>
            )}
            {logged_in && (
              <li>
                <Link to="/logout" onClick={this.handleLogout}>
                  Logout
                </Link>
              </li>
            )}
          </ul>
        </header>
        <Route
          path="/register"
          render={() => <RegistrationForm onLogin={onLogin} />}
        />
        <Route path="/message" component={MessageForm} />
        <Route path="/logout" />
        <Route path="/login" render={() => <LoginForm onLogin={onLogin} />} />
      </div>
    );
  }
}
export default withRouter(Navbar);
