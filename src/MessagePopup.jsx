import React, {Component} from 'react';
import 'styled-components/macro';
import styled from 'styled-components';
import ReactMapboxGl, { Popup } from 'react-mapbox-gl';
import MapboxGL from 'mapbox-gl';


const StyledPopup = styled.div`
  background: white;
  color: #3f618c;
  font-weight: 400;
  padding: 5px;
  border-radius: 2px;
`;

export default class MessagePopup extends Component {
  
  render () {
    return (
      <Popup
        offset={[0, -50]}
        coordinates={this.props.coordinates}
        text={this.props.text}
      >
        <StyledPopup>
          <h1>{this.props.text}</h1>
        </StyledPopup>
      </Popup> 
    )
    
  }
}

