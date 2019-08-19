import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Redirect, Route, Link, BrowserRouter as Router } from 'react-router-dom';
import RegistrationForm from './RegistrationForm';
import MessageForm from './MessageForm';
import Modal from './Modal';

export default class Navbar extends Component {

  render() {
    return (
      <Router>
        <header className="navbar navbar-expand navbar-dark flex-column flex-md-row bd-navbar">
          <div className="navbar-nav-scroll">
            <ul className="navbar-nav bd-navbar-nav flex-row">
              <li className="nav-item">
              <Link to="/message"> New Message </Link>
              </li>
             
            </ul>
          </div>
          <ul className="navbar-nav flex-row ml-md-auto d-none d-md-flex">
            <li>
              <Link to="/login"> Login </Link>
            </li>
            <li>
              <Link to="/register">
                Register
              </Link>
            </li>
          </ul>
        </header>
        <Route path="/register" component={RegistrationForm} />
        <Route path="/message" component={MessageForm} />
        {/* <Route path="/login" component={LoginForm} /> */}
      </Router>
    );
  }
}
