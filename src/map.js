import React from 'react';
import L from 'leaflet';

class Map extends React.Component {

  componentDidMount() {
    this.map = L.map('map', {
      layers: [
        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
          attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
        })
      ]
    });

    this.map.setView([43.89, -72.7317], 8);
    this.props.vtBorder.addTo(this.map).setStyle({fillColor: 'rgb(0,0,0,0)'})
  }

  componentDidUpdate({centerView, gameStarted}) {
    if(gameStarted && this.props.centerView !== centerView) {
      this.map.setView(this.props.centerView, 18)
    }

  }

  render() {
    return( <div id="map" ></div> )
  }
}

export default Map