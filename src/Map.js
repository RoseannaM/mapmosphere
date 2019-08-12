import React , {Component} from 'react';
import {render} from 'react-dom';
import ReactMapGL from 'react-map-gl';
import MapGL, {Marker, Popup, NavigationControl, FullscreenControl} from 'react-map-gl';

const example = {  
  "type":"FeatureCollection",
  "features":[  
     {  
        "type":"Feature",
        "properties":{  
           "scalerank":8,
           "name":"Fremantle",
           "website":"www.fremantleports.com.au",
           "natlscale":5,
           "featureclass":"Port"
        },
        "geometry":{  
           "type":"Point",
           "coordinates":[  
              115.7381037,
              -32.0475
           ]
        }
     }
  ]
};

export default class Map extends Component {

  state = {
    viewport: {
      width: 100,
      height: 100,
      latitude: 37.7577,
      longitude: -122.4376,
      zoom: 8
    }
  };

  render() {
    return (
        <div id="map">
          <ReactMapGL
            {...this.state.viewport}
            height='100%'
            width='100%'
            mapboxApiAccessToken={process.REACT_APP_MAPBOX_ACCESS_TOKEN}
            mapStyle="mapbox://styles/mapbox/streets-v9"
            onViewportChange={(viewport) => this.setState({viewport})}
          >
          </ReactMapGL>
        </div>
      )
  }
}
