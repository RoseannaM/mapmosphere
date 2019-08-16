import React, { Component } from 'react';
import 'styled-components/macro';
import styled from 'styled-components';
import MessagePopup from './MessagePopup';
import ReactMapboxGl, {
  GeoJSONLayer,
  ZoomControl,
  Marker,
  Layer,
  Feature,
  Cluster,
  Popup
} from 'react-mapbox-gl';
import MapboxGL from 'mapbox-gl';

const geojsonUrl = 'http://0.0.0.0:5000/spirit/api/v1.0/geojson.json';

const mapStyle = {
  position: 'absolute',
  top: '0',
  bottom: '0',
  width: '100%',
  height: ' 100%',
  flex: 1
};

// const allStyles = {
//   clusterMarker: {
//     width: 30,
//     height: 30,
//     borderRadius: '50%',
//     backgroundColor: '#51D5A0',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     color: 'white',
//     border: '2px solid #56C498',
//     cursor: 'pointer'
//   },
//   marker: {
//     width: 30,
//     height: 30,
//     borderRadius: '50%',
//     backgroundColor: '#E0E0E0',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     border: '2px solid #C9C9C9'
//   }
// };

const Map = ReactMapboxGl({
  accessToken:
    'pk.eyJ1Ijoicm9zZWFubmFtIiwiYSI6ImNqeWdrd2R2cTAyNHMzbW8wZmNqd2NnNjgifQ.NhBR5dNoezc0iAqQ-10pIA'
});

// const layoutLayer = {
//   'text-color': 'black',
//   'text-field': '{point_count_abbreviated}',
//   'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
//   'text-size': 12
// };
const circleLayout = { visibility: 'visible' };

export default class MapCompTest extends Component {
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

  componentDidMount() {
    fetch(geojsonUrl)
      .then(res => res.json())
      .then(myJson => {
        this.setState({ geojson: myJson });
      });
    this.setState({ zoom: [10] });
  }

  getFeature = (geojson, clickedFeature) =>{
    return geojson.features.find (
      feature => feature.properties.id === clickedFeature
    )
  }
  zoom = [4];

  center = [-77.01239, 38.91275];



  markerClick = feature => {
    this.setState({
      clickedFeature: feature.properties.id
    });
    console.log(feature);
  };

  onStyleLoad = map => {
    const { onStyleLoad } = this.props;
    return onStyleLoad && onStyleLoad(map);
  };

  onControlClick = (map, zoomDiff) => {
    console.log('e');
  };

  render() {
    const { popup, geojson, clickedFeature } = this.state;
    return (
      <div>
        <Map
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
            // paint={{
            //   'circle-color': {
            //     property: 'point_count',
            //     type: 'interval',
            //     stops: [[0, '#51bbd6'], [100, '#f1f075'], [750, '#f28cb1']]
            //   },
            //   'circle-radius': {
            //     property: 'point_count',
            //     type: 'interval',
            //     stops: [[0, 20], [100, 30], [750, 40]]
            //   }
            // }}
          >
            {geojson.features.map((feature, i) => (
              <Feature
                key={i}
                coordinates={feature.geometry.coordinates}
                onClick={this.markerClick.bind(this, feature)}
              />
            ))}
          </Layer>
          {clickedFeature && (
            <MessagePopup
            // getClickedFeature={this.getFeature(geojson)}
              text={this.getFeature(geojson, clickedFeature).properties.text}
              coordinates={this.getFeature(geojson, clickedFeature).geometry.coordinates}
            />
          )}
        </Map>
      </div>
    );
  }
}
