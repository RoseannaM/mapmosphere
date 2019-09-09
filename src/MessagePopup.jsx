import React, { Component } from 'react';
import Modal from './Modal';
import {
  withRouter,
  Redirect,
  Route,
  Link,
  BrowserRouter as Router 
} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartRegular, faImages } from '@fortawesome/free-regular-svg-icons';
import {
  faHeart as faHeartSolid,
} from '@fortawesome/free-solid-svg-icons';

export default class MessagePopup extends Component {
  handleLike = e => {
    e.preventDefault();
    const { liked, message_id } = this.props;
    const user_id = this.props.session.id;
    const likeMessageUrl =
      'http://0.0.0.0:5000/spirit/api/v1.0/messages/' + message_id + '/like';
    const args = { liked: liked, message_id: message_id, user_id: user_id };

    fetch(likeMessageUrl, {
      credentials: 'include',
      method: liked ? 'DELETE' : 'POST',
      body: JSON.stringify(args),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        return res.json()
        .then(json => {
          if (res.ok) {
            const state = liked ? false : true;
            this.props.likeMessage(message_id, state);
          }
        });
      })
      .catch(error => console.error('Error:', error));
  };

  render() {
    const { session, liked, text, city, country, message_id } = this.props;
    const loggedIn = session.logged_in;
    return (
      <Modal id="message-popup-modal">
        <div className={'message'}>
          <p>{text}</p>
        </div>
        {loggedIn && (
          <button className="like-btn" onClick={this.handleLike}>
            <FontAwesomeIcon icon={(liked && faHeartSolid) || faHeartRegular} />
          </button>
        )}
        {city && (
          <button className="images-btn">
            <Link to={`/images/${message_id}/${city}`}>
              <FontAwesomeIcon icon={faImages} />
            </Link>
          </button>
        )}
      </Modal>
    );
  }
}
