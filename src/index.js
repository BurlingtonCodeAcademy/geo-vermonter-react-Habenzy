import React from 'react';
import ReactDOM from 'react-dom';
import Map from './map';
import L from 'leaflet';
import borderData from './border';

class App extends React.Component {
  state = {
    gameStarted: false,

    vtBorder: L.geoJSON(borderData),
    centerView: {
      lat: 44,
      lng: -72.317
    },

    initialPoint: {
      lat: 44,
      lng: -72.317
    }
  }

  componentDidMount() {
    const randomLat = this.getRandoLat();
    const randomLng = this.getRandoLng();
    this.setState({
      centerView: {
        lat: randomLat,
        lng: randomLng
      },
      initialPoint: {
        lat: randomLat,
        lng: randomLng
      }
    })
  }

  getRandoLat() {
    let lat = Math.random() * (45.005419 - 42.730315) + 42.730315;
    return lat;
  }

  getRandoLng() {
    let lng = (Math.random() * (71.510225 - 73.35218) + 73.35218) * -1;
    return lng;
  }

  render() {
    let { centerView, vtBorder, gameStarted } = this.state
    return (
      <div>
        <Map centerView={centerView} vtBorder={vtBorder} gameStarted={gameStarted} />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)