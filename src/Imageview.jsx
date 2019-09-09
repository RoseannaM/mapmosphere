import React, { Component } from 'react';
import Modal from './Modal';
import { withRouter } from 'react-router-dom';
//import fetchPhotos from './fetchPhotos'

class Imageview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageData: ''
    };
  }
  
  componentDidMount() {
    const imageUrl = 'http://0.0.0.0:5000/spirit/api/v1.0/images/' + this.props.city;
    fetch(imageUrl, { credentials: 'include' })
    .then(res => res.json())
    .then(myJson => {
      console.log(myJson)
    });
  }

  handleChange = e => {
    this.setState({ messageData: e.target.value });
  };

  render() {
    return (
      <Modal id="images-modal">
        <div className={'images'}>
          <p>THIS IS STUFF</p>
        </div>
      </Modal>
    );
  }
}

export default withRouter(Imageview);
