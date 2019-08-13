import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MessageForm from './MessageForm';
import Modal from './Modal';

export default class Navbar extends Component {
  //set up defult state for the modal component
  constructor(props) {
    super(props);
    this.state = { showMessageForm: false };
  }
  //this is sugar for this.bind
  showModal = () => {
    console.log("show")
    this.setState({ showMessageForm: true });
  };

  hideModal = () => {
    console.log("hide")  
    this.setState({ showMessageForm: false });
  };

  render() {
    return (
      <div>
      <header className="navbar navbar-expand navbar-dark flex-column flex-md-row bd-navbar">
        <div className="navbar-nav-scroll">
          <ul className="navbar-nav bd-navbar-nav flex-row">
            <li className="nav-item">
              <button type="button" onClick={this.showModal}>
                SEND MESSAGE
              </button>
            </li>
            <li className="nav-item">LIKES</li>
          </ul>
        </div>
        <ul className="navbar-nav flex-row ml-md-auto d-none d-md-flex">
          <li className="nav-item">LOGIN</li>
          <li className="nav-item">ETC</li>
          <li className="nav-item">ETC</li>
        </ul>
      </header>
        <Modal showMessageForm={this.state.showMessageForm} handleClose={this.hideModal}>
         <MessageForm />
        </Modal>
      </div>
    );
  }
}
