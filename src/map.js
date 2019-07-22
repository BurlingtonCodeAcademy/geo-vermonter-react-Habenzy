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
    this.props.vtBorder.addTo(this.map).setStyle({fillColor: 'rgba(0,0,0,0)'})
  }

  componentDidUpdate({ centerView }) {
    this.map.removeControl(this.map.zoomControl);
    this.map.touchZoom.disable();
    this.map.dragging.disable();
    this.map.doubleClickZoom.disable();
    this.map.scrollWheelZoom.disable();
    this.map.boxZoom.disable();
    this.map.keyboard.disable();
    if(this.props.gameStarted && this.props.centerView !== centerView) {
      this.map.setView(this.props.centerView, 18);
    }
    else if(!this.props.gameStarted) {
      this.map.touchZoom.enable();
      this.map.dragging.enable();
      this.map.doubleClickZoom.enable();
      this.map.scrollWheelZoom.enable();
      this.map.boxZoom.enable();
      this.map.keyboard.enable(); 
    }
  }

  render() {
    return( <div id="map" ></div> )
  }
}

export default Map