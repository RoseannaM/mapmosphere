import React, { Component, ReactDOM } from 'react';
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
    if (
      className === 'modal' ||
      className === 'modal-btn' ||
      className === 'fa fa-times'
    ) {
      this.props.history.push('/');
    }
  };

  render() {
    const { children, onScroll, error, formName } = this.props;
    return (
      <div>
        <div onClick={this.handleClose} className="modal" ref={this.modalDiv}>
          <section
            id={this.props.id}
            onScroll={this.props.scroll}
            className="modal-main"
          >
            <p>{error}</p>
            <h3>{formName}</h3>
            {children}
          </section>
        </div>
      </div>
    );
  }
}
export default withRouter(Modal);
