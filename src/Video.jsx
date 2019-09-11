import React, { Component } from 'react';
import video from './Stars_Timelapse_from_Beach_1Videvo.mov';

class Video extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoURL: video
    };
  }

  render() {
    return (
      <video loop muted autoPlay playsInline playbackRate={0.5} poster={video}>
        <source src={video} type="video/mp4" />
      </video>
    );
  }
}

export default Video;
