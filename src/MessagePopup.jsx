import React, { Component } from 'react';
import 'styled-components/macro';
import styled from 'styled-components';
import ReactMapboxGl, { Popup } from 'react-mapbox-gl';
import MapboxGL from 'mapbox-gl';
import Modal from './Modal';import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart  as faHeartRegular } from '@fortawesome/free-regular-svg-icons'
import { faHeart as faHeartSolid}  from '@fortawesome/free-solid-svg-icons'



export default class MessagePopup extends Component {
  
  handleLike = ()=>{

  }

  render() {
    return (
      <Modal id="message-modal">
        <div className={'message'}>
          <p>{this.props.text}</p>
        </div>
        <button className="like-btn" onClick={this.handleLike}>
          <FontAwesomeIcon icon={faHeartSolid} />
        </button>
      </Modal>
    );
  }
}
