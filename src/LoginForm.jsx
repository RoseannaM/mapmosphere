import React, { Component } from 'react';
import Modal from './Modal';
import { withRouter, Route, Link, BrowserRouter as Router } from 'react-router-dom';

class LoginFormView extends Component {
  render() {
    return (
      <Modal id="login-modal">
        <div className={'login'}>
          <form onSubmit={this.props.submit}>
            <label>Email</label>
            <textarea
              rows="5"
              cols="30"
              type="text"
              value={this.props.value}
              onChange={this.props.onChange}
            />
            <label>Password</label>
            <textarea
              rows="5"
              cols="30"
              type="text"
              value={this.props.value}
              onChange={this.props.onChange}
            />
            <input type="submit" value="Submit" />
          </form>
        </div>
      </Modal>
    );
  }
}
export default withRouter(LoginFormView);