import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { visible } from 'ansi-colors';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.props = this.props;
    this.modalDiv = React.createRef();
  }
  
  handleClose = e => {
    const className = e.target.className;
    if (className === 'modal' || 
        className === 'modal-btn' ||
        className === 'fa fa-times') {
        this.props.history.push('/')
    }
    // if (!this.modalDiv.current.isSameNode(e.target)) {
    //   this.props.history.push('/')
    // }
  };

  render() {
    const { children} = this.props;
    return (
      <div>
        <div onClick={this.handleClose} className="modal" ref={this.modalDiv}>
          <section className="modal-main">
            <p>{this.props.error}</p>
            <h3>{this.props.formName}</h3>
            {children}
            {/* <button className="modal-btn" onClick={this.handleClose}>
              <i id={this.props.id} className="fa fa-times" aria-hidden="true"></i>
            </button> */}
          </section>
        </div>
      </div>
    );
  }
}
export default withRouter(Modal);