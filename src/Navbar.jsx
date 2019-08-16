import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MessageForm from './MessageForm';
import Modal from './Modal';

export default class Navbar extends Component {
  //set up defult state for the modal component
  constructor(props) {
    super(props);
    this.state = {
      messageData: '',
      showMessageForm: false
    };
  }

  showModal = () => {
    this.setState({ showMessageForm: true });
  };

  hideModal = () => {
    this.setState({ showMessageForm: false });
  };

  handleChange = e => {
    this.setState({ messageData: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const postMessageUrl = 'http://0.0.0.0:5000/spirit/api/v1.0/message';
    const messageData = { messageText: this.state.messageData };

    fetch(postMessageUrl, {
      method: 'POST',
      body: JSON.stringify(messageData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(response => {
        this.setState({ showMessageForm: false });
        console.log('Success:', JSON.stringify(response));
      })
      .catch(error => console.error('Error:', error));
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
        <Modal
          showMessageForm={this.state.showMessageForm}
          handleClose={this.hideModal}
        >
          <MessageForm
            submit={this.handleSubmit}
            value={this.state.messageData}
            onChange={this.handleChange.bind(this)}
          />
        </Modal>
      </div>
    );
  }
}
