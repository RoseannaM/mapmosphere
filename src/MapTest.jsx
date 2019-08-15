// import React, { Component } from 'react';
// import 'styled-components/macro';
// import styled from 'styled-components';
// import ReactMapboxGl, { GeoJSONLayer, ZoomControl, Marker, Layer, Feature, Cluster, Popup} from 'react-mapbox-gl';
// import MapboxGL from 'mapbox-gl';

// const geojsonUrl = 'http://0.0.0.0:5000/spirit/api/v1.0/geojson.json';

// const mapStyle = {
//     position: 'absolute',
//     top: '0',
//     bottom: '0',
//     width: '100%',
//     height:' 100%',
//     flex: 1
// };


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
// }
// const polygonPaint = {
//   "fill-color": "#00ffff"
// };
// const Map = ReactMapboxGl({
//   accessToken: "pk.eyJ1Ijoicm9zZWFubmFtIiwiYSI6ImNqeWdrd2R2cTAyNHMzbW8wZmNqd2NnNjgifQ.NhBR5dNoezc0iAqQ-10pIA"
// });

// const symbolLayout = {
//   'text-field': '{place}',
//   'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
//   'text-offset': [0, 0.6],
//   'text-anchor': 'top'
// };
// const symbolPaint = {
//   'text-color': 'black'
// };

// const circleLayout = { visibility: 'visible' };
// const circlePaint = {
//   'circle-color': 'red'
// };


// export default class Map2 extends Component {
  
//   constructor(props) {
//     super(props)  

//     this.state = {
//       geojson : {features: []},
//       popup: undefined,
//     };
//   }

//   componentDidMount(){
//     fetch(geojsonUrl)
//     .then(res => res.json())
//     .then(myJson => {
//       this.setState({ geojson: myJson });
//     });
//   }

//   zoom = [4];


//   onMove = () => {
//     if (this.state.popup) {
//       this.setState({ popup: undefined });
//     }
//   };

  

//   center = [-77.01239, 38.91275];

//   onClickCircle = e => {
//     console.log(e);
//   };

//   markerClick = (feature ) => {
//     this.setState({
//       center: feature.geometry.coordinates,
//       zoom: [14]
//     });
//   };

//   onStyleLoad = map => {
//     const { onStyleLoad } = this.props;
//     return onStyleLoad && onStyleLoad(map);
//   };

//   onToggleHover(cursor, { map }) {
//     map.getCanvas().style.cursor = cursor;
//   }
//   onControlClick = (map, zoomDiff) => {
//   console.log("e")
//   }
  
//   render() {
//     const { popup, geojson } = this.state;
//     return (
//       <div>
     
//       <Map
//         onMove={this.onMove}
//         zoom={this.zoom}
//         style={'mapbox://styles/mapbox/streets-v9'}
//         center={this.center}
//         containerStyle={mapStyle}
//         onStyleLoad={this.onStyleLoad}
//       >
//       <Layer type="circle" id="marker" paint={polygonPaint} >
//         <Feature coordinates={[-0.13235092163085938,51.518250335096376]}/>
//         <Feature coordinates={[-0.13235092163085938,51.518250335096376]}/>
//           {/* {geojson.features.map((feature, key) => { 
//             console.log(feature.geometry.coordinates)
//             return (
//             <Feature
//               key={key}
//               // onMouseEnter={this.onToggleHover.bind(this, 'pointer')}
//               // onMouseLeave={this.onToggleHover.bind(this, '')}
//               //onClick={this.markerClick.bind(this, feature)}
//               coordinates={feature.geometry.coordinates}
//             />
//           )}
//           )} */}
//         </Layer>
//       </Map>
//       </div>
//     );
//   }
// }
