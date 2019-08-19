import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.props = this.props;
  }

  handleClose = e => {
    this.props.history.push('/')
  };

  render() {
    const { children} = this.props;
    return (
      <div>
        <section className="modal-main">
          {children}
          <button onClick={this.handleClose}>
            <i id={this.props.id} className="fa fa-times" aria-hidden="true"></i>
          </button>
        </section>
      </div>
    );
  }
}
export default withRouter(Modal);