import React, { Component } from 'react';
import Modal from './Modal';
import { withRouter } from 'react-router-dom';
import { resolve } from 'upath';
//import fetchPhotos from './fetchPhotos'

class Imageview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images : [],
      messageData: ''
    };
  }
  
  componentDidMount() {
    const imageUrl = 'http://0.0.0.0:5000/spirit/api/v1.0/images/' + this.props.city;
    fetch(imageUrl, { credentials: 'include' })
    .then(res => res.json())
    .then(myJson => {
      const images = myJson.graphql.location.edge_location_to_media.edges.slice(0,10);
      this.setState({ images: images});
    });
  }

  handleChange = e => {
    this.setState({ messageData: e.target.value });
  };

  render() {
    const images = this.state.images;
    console.log(images)
    return (
      <Modal id="images-modal">
        <div className={'images'}>
        {images.length > 0 && images.map((image, i) => (
            <div key={i}>
              <p>{image.node.id}</p>
              <img src={image.node.display_url}/>
            </div>
            ))}
        </div>
      </Modal>
    );
  }
}

export default withRouter(Imageview);
