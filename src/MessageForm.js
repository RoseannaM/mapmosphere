import React , {Component} from 'react';
export default class MessageForm extends Component {
    constructor(props) {
      super(props);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleSubmit(e) {
      alert('The value is: ' + this.input.value);
      e.preventDefault();
      //use fetch to post input data to my beautiful app
      //fetch post json

      const postMessageUrl = 'http://0.0.0.0:5000/spirit/api/v1.0/message';
      const messageData = {messageText: this.input.value};

      fetch(postMessageUrl, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(messageData), // data can be `string` or {object}!
        headers:{
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
      .then(response => console.log('Success:', JSON.stringify(response)))
      .catch(error => console.error('Error:', error));
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Message:
          </label>
          <textarea rows="5" cols="30" type="text" ref={(input) => this.input = input} />
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }