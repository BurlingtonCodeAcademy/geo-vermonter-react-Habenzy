import React from 'react';
import ReactDOM from 'react-dom';
import L from 'leaflet';
import borderData from './border';
import LeafletPip from '@mapbox/leaflet-pip';

import Map from './map';

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
    document.getElementById('quit').disabled = true;
    document.getElementById('guess').disabled = true
  }

  getRandoLat() {
    let lat = Math.random() * (45.005419 - 42.730315) + 42.730315;
    return lat;
  }

  getRandoLng() {
    let lng = (Math.random() * (71.510225 - 73.35218) + 73.35218) * -1;
    return lng;
  }

  startGame = () => {
    let randomLat = this.getRandoLat();
    let randomLng = this.getRandoLng();
    let layerArray = []

    while (layerArray.length === 0) {
      layerArray = LeafletPip.pointInLayer([randomLng, randomLat], L.geoJSON(borderData))
      if (!layerArray.length) {
        console.log('Not in VT!')
        randomLat = this.getRandoLat();
        randomLng = this.getRandoLng();
      }
    }
    console.log(`In VT at ${randomLat} ${randomLng}! Setting state...`)
    this.setState(
      {
        gameStarted: true,
        centerView: {
          lat: randomLat,
          lng: randomLng
        },
        initialPoint: {
          lat: randomLat,
          lng: randomLng
        }
      }
    );
    
    document.getElementById('start').disabled = true;
    document.getElementById('quit').disabled = false;
    document.getElementById('guess').disabled = false
  }

  giveUp = () => {
    this.setState({ gameStarted: false })
    document.getElementById('start').disabled = false;
    document.getElementById('quit').disabled = true;
    document.getElementById('guess').disabled = true
  }

  guess = () => {
    this.setState({ gameStarted: false })
    document.getElementById('start').disabled = false;
    document.getElementById('quit').disabled = true;
    document.getElementById('guess').disabled = true
  }

  moveNorth = () => {
    this.setState(
      {
        centerView: {
          lat: this.state.centerView.lat + .002,
          lng: this.state.centerView.lng
        }
      })
  }

  moveSouth = () => {
    this.setState(
      {
        centerView: {
          lat: this.state.centerView.lat - .002,
          lng: this.state.centerView.lng
        }
      })
  }

  moveEast = () => {
    this.setState(
      {
        centerView: {
          lat: this.state.centerView.lat,
          lng: this.state.centerView.lng + .0025
        }
      })
  }

  moveWest = () => {
    this.setState(
      {
        centerView: {
          lat: this.state.centerView.lat,
          lng: this.state.centerView.lng - .0025
        }
      })
  }

  render() {
    let { centerView, vtBorder, gameStarted, initialPoint } = this.state
    return (
      <div>
        <div id="game-buttons">
          <button id="start" onClick={this.startGame}>Start</button>
          <button id="quit" onClick={this.giveUp}>Give Up</button>
          <button id="guess" onClick={this.guess}>Guess</button>
        </div>
        <div id="game-area">
          <button id="north" className="move-button" onClick={this.moveNorth} >Go North</button>
          <button id="south" className="move-button" onClick={this.moveSouth} >Go South</button>
          <button id="east" className="move-button" onClick={this.moveEast} >Go East</button>
          <button id="west" className="move-button" onClick={this.moveWest} >Go West</button>
          <Map centerView={centerView} vtBorder={vtBorder} gameStarted={gameStarted} initialPoint={initialPoint} />
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)