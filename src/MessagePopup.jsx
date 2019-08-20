import React, { Component } from 'react';
import 'styled-components/macro';
import styled from 'styled-components';
import ReactMapboxGl, { Popup } from 'react-mapbox-gl';
import MapboxGL from 'mapbox-gl';
import Modal from './Modal';

export default class MessagePopup extends Component {
  render() {
    return (
      <Modal id="message-modal">
        <div className={'message'}>
          <p>{this.props.text}</p>
        </div>
      </Modal>
    );
  }
}
