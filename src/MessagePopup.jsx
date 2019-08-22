import React, { Component } from 'react';
import 'styled-components/macro';
import styled from 'styled-components';
import ReactMapboxGl, { Popup } from 'react-mapbox-gl';
import MapboxGL from 'mapbox-gl';
import Modal from './Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import UserProfile from './UserProfile';

export default class MessagePopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_favourite: undefined
    };
  }

  //check if they have liked before, it should toggle
  isLiked = (e) => {
    const id = this.props.session.id;
    const url =
      'http://0.0.0.0:5000/spirit/api/v1.0/favourites/' + 2;
    fetch(url)
      .then(res => {
        return res.json().then(json => {
          if (res.ok) {
            console.log("test")
            //console.log(JSON.stringify(json).keys().find(1));
          } else {
            this.setState({ error: true, errorMessage: json.error });
          }
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  handleLike = (e) => {
    e.preventDefault();
    this.isLiked()
    
    // const postMessageUrl = 'http://0.0.0.0:5000/spirit/api/v1.0/favourites/create';
    // const args = { message_id:  this.props.messageId,  user_id : this.state.password };

    // fetch(postMessageUrl, {
    //   credentials: 'include',
    //   method: 'POST',
    //   body: JSON.stringify(args),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // })
    //   .then(res => res.json())
    //   .then(response => {
    //     this.props.history.push('/')
    //     console.log('Success:', JSON.stringify(response));
    //   })
    //   .catch(error => console.error('Error:', error));
  };

  render() {
    const { text, session } = this.props;
    const loggedIn = session.logged_in;
    const user_id = session.id
    return (
      <Modal id="message-modal">
        <div className={'message'}>
          <p>{this.props.text}</p>
        </div>
        {loggedIn && (
          <button className="like-btn" onClick={this.handleLike}>
            <FontAwesomeIcon icon={faHeartSolid} />
          </button>
        )}
      </Modal>
    );
  }
}
