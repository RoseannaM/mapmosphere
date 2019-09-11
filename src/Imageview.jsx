import React, { Component } from 'react';
import Modal from './Modal';
import { withRouter } from 'react-router-dom';
import globe from './earth-animated.gif';
import styled from 'styled-components';


const StyledModal = styled.div`
  background: white;
  color: #3f618c;
  font-weight: 400;
  padding: 5px;
  border-radius: 2px;
`;


class Imageview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      images: [],
      messageData: ''
    };
  }

  componentDidMount() {
    const imageUrl =
      'http://0.0.0.0:5000/spirit/api/v1.0/images/' + this.props.city;
    fetch(imageUrl, { credentials: 'include' })
      .then(res => res.json())
      .then(myJson => {
        const images = myJson.graphql.location.edge_location_to_media.edges.slice(
          0,
          9
        );
        this.setState({ images: images, loading: false});
      });
  }

  handleChange = e => {
    this.setState({ messageData: e.target.value });
  };

  render() {
    const {images, loading} = this.state;
    return (
      <div>
      <Modal id="images-modal">
        {loading ? (
          <img id="globe-spinner" alt="globe spinning loader" src={globe} />
        ) : (
          <div className={'images'}>
            <div className="images-grid-layout">
              {images.length > 0 &&
                images.map((image, i) => (
                  <div className={'image'} key={i}>
                    <img
                      alt="intagram"
                      className={'image-wrapper'}
                      src={image.node.display_url}
                    />
                  </div>
                ))}
            </div>
          </div>
        )}
      </Modal>
      </div>
    );
  }
}

export default withRouter(Imageview);
