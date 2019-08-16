import React, { Component } from 'react';

export default class Modal extends Component {
  constructor(props) {
    super(props);
    this.test = this.props;
  }

  render() {
    const showHideClassName = this.props.showMessageForm ? 'modal display-block' : 'modal display-none';  
    const { handleClose, children} = this.props;
    return (
      <div className={showHideClassName}>
        <section className="modal-main">
          {children}
          <button onClick={handleClose}>
          <i className="fa fa-times" aria-hidden="true"></i>
          </button>
        </section>
      </div>
    );
  }
}
