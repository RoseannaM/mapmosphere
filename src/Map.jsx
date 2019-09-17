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
import ReactMapboxGl, {
  Cluster,
  Marker,
  ZoomControl,
  Layer,
  Feature,
  Popup
} from 'react-mapbox-gl';
import Modal from './Modal';
import MapboxGL from 'mapbox-gl';

const geojsonUrl = '/spirit/api/v1.0/geojson.json';

const mapStyle = {
  position: 'absolute',
  top: '8%',
  left: '5%',
  width: '90%',
  height: '85%',
  flex: 1,
  border: '3px solid rgba(255, 0, 212, 0.79)',
  boxShadow: '1px 1px 8px 4px rgba(188, 8, 232, 0.8)',
  borderRadius: '4px'
};

const StyledPopup = styled.div`
  background: white;
  color: #03a9f4;
  font-weight: 500;
  font-size: 1.2em;
  padding: 5px;
  border-radius: 2px;
  line-height: 1.6;
`;

const styles = {
  clusterMarker: {
    width: 30,
    height: 30,
    borderRadius: '50%',
    backgroundColor: '#e147dc',
    boxShadow: 'rgb(225, 71, 220) 0 0 6px 3px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    cursor: 'pointer'
  },
  marker: {
    width: 30,
    height: 30,
    borderRadius: '50%',
    backgroundColor: '#E0E0E0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '2px solid #C9C9C9'
  }
};

const paint = {
  'circle-blur': 0.5,
  'circle-color': '#e147dc',
  'circle-radius': 8,
  'circle-stroke-width': 4,
  'circle-stroke-color': '#e147dc',
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
      zoom: [1.5],
      clickedFeature: undefined
    };
  }

  clusterMarker = (
    coordinates,
    pointCount,
    getLeaves: (limit, offset) => Array<React.ReactElement<any>>
  ) => (
    <Marker
      key={coordinates.toString()}
      coordinates={coordinates}
      style={styles.clusterMarker}
      onClick={this.clusterClick.bind(this, coordinates, pointCount, getLeaves)}
    >
      <div>{pointCount}</div>
    </Marker>
  );

  onMove = () => {
    if (this.state.popup) {
      this.setState({ popup: undefined });
    }
  };

  clusterClick = (
    coordinates,
    total,
    getLeaves: (limit, offset) => Array<React.ReactElement<any>>,
    e
  ) => {
    e.stopPropagation();
    this.setState({
      popup: {
        coordinates,
        total,
        leaves: getLeaves()
      }
    });
  };

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
  shortenText = (text) =>{

    if(text.length > 20){
      console.log(text.substring(0,20))
      return text.substring(0,20) + "..."
    }
    else return text
  }
  zoom = [9];

  center = [-13.007812, 40.979898];

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
          renderChildrenInPortal={true}
        >
          <ZoomControl position={'bottom-left'} />
          <Cluster ClusterMarkerFactory={this.clusterMarker} radius={10}>
            {geojson.features.map(
              (feature, key) => (
                (
                  <Feature
                    key={key}
                    style={styles.marker}
                    coordinates={feature.geometry.coordinates}
                    data-feature={feature}
                  >
                    <div title={feature.properties.id}>
                      {feature.properties.id}
                    </div>
                  </Feature>
                )
              )
            )}
          </Cluster>
          {popup && (
            <Popup offset={[0, -10]} coordinates={popup.coordinates}>
              <StyledPopup>
                {popup.leaves.map(
                  (leaf, index) => (
                    (
                      <div 
                        className="popup-link"
                        id={index}
                        onClick={this.markerClick.bind(
                          this,
                          leaf.props['data-feature']
                        )}
                        key={index}
                      >
                        {this.shortenText(leaf.props['data-feature'].properties.text)}
                      </div>
                    )
                  )
                )}
                {popup.total > popup.leaves.length ? (
                  <div>And more...</div>
                ) : null}
              </StyledPopup>
            </Popup>
          )}
          <Layer
            type="circle"
            id="cluster_layer"
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
              render={params => {
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
