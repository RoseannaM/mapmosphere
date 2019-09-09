import React, { Component } from 'react';
import styled from 'styled-components';
import MessagePopup from './MessagePopup';
import MessageForm from './MessageForm';
import Imageview from './Imageview';

import {
  withRouter,
  Redirect,
  Route,
  Link,
  BrowserRouter as Router
} from 'react-router-dom';
import ReactMapboxGl, { ZoomControl, Layer, Feature } from 'react-mapbox-gl';
import Modal from './Modal';
import MapboxGL from 'mapbox-gl';

const geojsonUrl = 'http://0.0.0.0:5000/spirit/api/v1.0/geojson.json';

const mapStyle = {
  position: 'absolute',
  top: '5%',
  left: '5%',
  width: '90%',
  height: '90%',
  flex: 1,
  border: 'solid #ffffff 5px'
};

const paint = {
  'circle-blur': 0.5,
  'circle-color': '#eccaec',
  'circle-radius': 9,
  'circle-stroke-width': 5,
  'circle-stroke-color': '#eccaec',
  'circle-stroke-opacity': 0.5
};
const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN
});

class MapCompTest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      geojson: { features: [] },
      popup: undefined,
      zoom: [1],
      clickedFeature: undefined
    };
  }
  createCoord = markerGeoJson => {
    const coord = this.markerGeoJson.features.find(
      feature => feature.properties.id === this.clickedFeature
    ).geometry.coordinates;

    return coord;
  };

  addMessage = message => {
    this.setState({
      geojson: {
        features: [...this.state.geojson.features, message]
      }
    });
  };

  likeMessage = (message_id, state) => {
    //modifiy geojson to match new state
    const feature = this.getFeature(this.state.geojson, message_id);
    this.setState({
      geojson: {
        features: [
          //spread all except the one we will mutate
          ...this.state.geojson.features.filter(f => {
            return f !== feature;
          }), // filter fearture we're updating
          // put updated feature here
          {
            ...feature,
            properties: {
              ...feature.properties,
              liked: state
            }
          }
        ]
      }
    });
  };

  componentDidMount() {
    fetch(geojsonUrl, { credentials: 'include' })
      .then(res => res.json())
      .then(myJson => {
        this.setState({ geojson: myJson });
      });
    this.setState({ zoom: [10] });
  }

  getFeature = (geojson, clickedFeature) => {
    return geojson.features.find(
      feature => feature.properties.id === clickedFeature
    );
  };

  zoom = [4];

  center = [-77.01239, 38.91275];

  markerClick = feature => {
    this.setState({
      clickedFeature: feature.properties.id
    });
    this.props.history.push('/view-message/' + feature.properties.id);
  };

  handleMapClick = e => {
    this.setState({ clickedFeature: undefined });
  };

  onStyleLoad = map => {
    const { onStyleLoad } = this.props;
    return onStyleLoad && onStyleLoad(map);
  };

  render() {
    const { popup, geojson, clickedFeature } = this.state;
    const session = this.props.session;
    return (
      <div>
        <Map
          onClick={this.handleMapClick}
          onMove={this.onMove}
          zoom={this.state.zoom}
          style={'mapbox://styles/mapbox/streets-v9'}
          center={this.center}
          containerStyle={mapStyle}
          onStyleLoad={this.onStyleLoad}
        >
          <ZoomControl position={'bottom-left'} />

          <Layer
            id="cluster_layer"
            type="circle"
            layerOptions={{
              filter: ['has', 'point_count']
            }}
            paint={paint}
          >
            {geojson.features.map((feature, i) => (
              <Feature
                key={i}
                coordinates={feature.geometry.coordinates}
                onClick={this.markerClick.bind(this, feature)}
              />
            ))}
          </Layer>
        </Map>
        <Route
          path="/message"
          render={() => <MessageForm addMessage={this.addMessage} />}
        />
        {geojson.features.length > 0 && (
          <div>
            <Route
              path="/view-message/:id"
              render={params => {
                const id = parseInt(params.match.params.id);
                const feature = this.getFeature(geojson, id);
                return (
                  <MessagePopup
                    likeMessage={this.likeMessage}
                    liked={feature.properties.liked}
                    session={session}
                    message_id={id}
                    text={feature.properties.text}
                    country={feature.properties.country}
                    city={feature.properties.city}
                  />
                );
              }}
            />
            <Route 
              path="/images/:id"
              render={ params => {
                const id = parseInt(params.match.params.id);
                const feature = this.getFeature(geojson, id);
                return (
                  <Imageview
                    city={feature.properties.city}
                    session={session}
                    message_id={id}
                  />
                );
              }}
              />
          </div>
        )}
      </div>
    );
  }
}
export default withRouter(MapCompTest);
