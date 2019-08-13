import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Navbar extends Component {
  render() {
    return (
        <header className="navbar navbar-expand navbar-dark flex-column flex-md-row bd-navbar">
            <div className="navbar-nav-scroll">
                <ul className="navbar-nav bd-navbar-nav flex-row">
                    <li className="nav-item">
                        NEW MESSAGE
                    </li>
                    <li className="nav-item">
                        LIKES
                    </li>
                </ul>
            </div>
            <ul className="navbar-nav flex-row ml-md-auto d-none d-md-flex">
                <li className="nav-item">
                    LOGIN
                </li>
                <li className="nav-item">
                    ETC
                </li>
                <li className="nav-item">
                    ETC
                </li>
            </ul>
        </header>
    );
  }
}
