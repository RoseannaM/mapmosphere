import React, { Component } from 'react';
import {
  withRouter,
  Link,
  BrowserRouter as Router
} from 'react-router-dom';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import Modal from './Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import {
  faHeart as faHeartSolid,
  faLeaf
} from '@fortawesome/free-solid-svg-icons';

class AllLikes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      setIsFetching: false,
      page: 1,
      allLikedFeatures: [],
      hasNext: true
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.session.id !== prevProps.session.id) {
      this.fetchData();
    }
  }

  fetchData = e => {
    const user_id = this.props.session.id;
    if (user_id) {
      const likeMessagesUrl = `/spirit/api/v1.0/message/${user_id}/like?page=${this.state.page}`;
      fetch(likeMessagesUrl, {
        credentials: 'include'
      })
        .then(res => {
          return res.json().then(json => {
            if (res.ok) {
              this.setState(prevState => {
                return {
                  page: prevState.page + 1,
                  setIsFetching: true,
                  hasNext: json[1],
                  allLikedFeatures: prevState.allLikedFeatures.concat(json[0])
                };
              });
            }
          });
        })
        .catch(error => console.error('Error:', error));
    }
  };

  handleScroll = e => {
    const { isFetching, hasNext } = this.state;
    let element = e.target;
    let bottom =
      element.scrollHeight - element.scrollTop === element.clientHeight;

    if (bottom && !isFetching && hasNext) {
      this.fetchData();
    }
  };

  componentDidMount() {
    if (!this.props.session) return null;
    else {
      this.fetchData();
    }
  }
  render() {
    if (!this.props.session) return null;
    const { allLikedFeatures } = this.state;
    return (
      <Modal scroll={this.handleScroll} formName={'Liked Messages'} id="liked-message-modal">
        {allLikedFeatures.length > 0 && (
          <ul id={'liked-message-list'}>
            <SimpleBar style={{ height: '100px'}}>
            {allLikedFeatures.map((feature, i) => (
              <div key={i} id={'liked-feature-btn'}>
                <Link to={`view-message/` + feature.properties.id}>
                  {feature.properties.text}
                </Link>
              </div>
            ))}
            </SimpleBar>
          </ul>
        )}
        <div>
          {allLikedFeatures.length > 0 || (
            <h3 className="solid-like">
              Add Some Likes <FontAwesomeIcon icon={faHeartSolid} />
            </h3>
          )}
        </div>
      </Modal>
    );
  }
}
export default withRouter(AllLikes);
