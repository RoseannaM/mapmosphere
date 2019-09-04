import React, { Component } from 'react';
import Modal from './Modal';
import { withRouter } from 'react-router-dom';

class MessageFormView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageData: ''
    };
  }

  handleSubmit = e => {
    e.preventDefault();

    const postMessageUrl = 'http://0.0.0.0:5000/spirit/api/v1.0/message';
    const messageData = { messageText: this.state.messageData };
    this.props.history.push('/');
    //optimistic loading create a feature and add it
    fetch(postMessageUrl, {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify(messageData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        return res.json().then(json => {
          if (res.ok) {
            console.log('Success:', JSON.stringify(json));
            this.props.addMessage(json);
          }
        });
      })
      .catch(error => console.error('Error:', error));
  };

  handleChange = e => {
    this.setState({ messageData: e.target.value });
  };

  render() {
    return (
      <Modal id="message-modal">
        <div className={'message'}>
          <form onSubmit={this.handleSubmit}>
            <h3>Write Message:</h3>
            <textarea
              name="message"
              rows="5"
              cols="30"
              type="text"
              value={this.state.messageData}
              onChange={this.handleChange}
            />
            <input type="submit" value="Submit" />
          </form>
        </div>
      </Modal>
    );
  }
}

export default withRouter(MessageFormView);
