import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  withRouter,
  Redirect,
  Route,
  Link,
  BrowserRouter as Router
} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {faPencilAlt, faHeart, faSignOutAlt, faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import RegistrationForm from './RegistrationForm';
import MessageForm from './MessageForm';
import LoginForm from './LoginForm';
import AllLikes from './AllLikes';

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
        <header id="nav" className="navbar navbar-expand navbar-dark flex-column flex-md-row bd-navbar">
          <div className="navbar-nav-scroll">
          {logged_in && (
            <ul className="navbar-nav bd-navbar-nav flex-row">
              
                <li id="new-message" className="nav-item">
                  <Link to="/message">
                    New
                    <FontAwesomeIcon icon={faPlusCircle} />
                   </Link>
                </li>
                <li id="all-likes" className="nav-item solid-like">
                <Link to="/likes">
                  Likes
                  <FontAwesomeIcon icon={faHeart} />
                </Link>
                </li>
              
            </ul>
            )}
          </div>
          <ul className="navbar-nav flex-row ml-md-auto d-none d-md-flex">
            {logged_in || (
              <div className="nav-item login-btns">
                <li id="login">
                  <Link to="/login">Login</Link>
                </li>
                <li id="register">
                  <Link to="/register">Register</Link>
                </li>
              </div>
            )}
            {logged_in && (
              <li id="logout" className="nav-item">
                <Link to="/logout" onClick={this.handleLogout}>
                  Logout
                  <FontAwesomeIcon icon={faSignOutAlt}/>
                </Link>
              </li>
            )}
          </ul>
        </header>
        <Route path="/likes" render={() => <AllLikes session={session}/>} />
        <Route
          path="/register"
          render={() => <RegistrationForm onLogin={onLogin} />}
        />
        <Route path="/logout" />
        <Route path="/login" render={() => <LoginForm onLogin={onLogin} />} />
      </div>
    );
  }
}
export default withRouter(Navbar);
