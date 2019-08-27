import React, { Component } from 'react';
import {
    withRouter,
    Redirect,
    Route,
    Link,
    BrowserRouter as Router
  } from 'react-router-dom';
import Modal from './Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import {
  faHeart as faHeartSolid,
  faLeaf
} from '@fortawesome/free-solid-svg-icons';
import UserProfile from './UserProfile';

class AllLikes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page : 1,
      allLikedFeatures: [
      ]
    };
  }
  componentDidUpdate(prevProps) {
    if (this.props.session.id !== prevProps.session.id) {
      this.handleScroll()
    }
  }

  handleScroll = e => {
    const user_id = this.props.session.id;
    if(user_id){
      const likeMessagesUrl = `http://0.0.0.0:5000/spirit/api/v1.0/message/${user_id}/like?page=${this.state.page}`
      fetch(likeMessagesUrl, {
        credentials: 'include',})
        .then(res => {
          return res.json()
          .then(json => {
            if (res.ok) {
              this.setState({ allLikedFeatures: json });
            }
          });
        })
        .catch(error => console.error('Error:', error));
      }
  };
  
  componentDidMount(){
    if(!this.props.session) return null
    else {
      this.handleScroll()
    }
  }
  
  
  render() {
    if(!this.props.session) return null
    const { allLikedFeatures} = this.state;
    allLikedFeatures.map((feature, i) => (
      console.log(feature)
    ));
    return (
      <Modal id="message-modal">
        <ul className={'liked-message-list'}>
            {allLikedFeatures.map((feature, i) => (
                <div id={"liked-feature-btn"}>
                <Link to={`view-message/` + feature.properties.id}> {feature.properties.text} </Link>
                
                </div>
                
            ))}
        </ul>
      </Modal>
    );
  }
}
export default withRouter(AllLikes);