import React from 'react';
import ReactDOM from 'react-dom';
import L from 'leaflet';
import borderData from './border';
import LeafletPip from '@mapbox/leaflet-pip';
import InfoBox from './info-box';

//-------------React Components----------------------//
import Map from './map';
import Modal from './modal'

//-------------Main React parent Component-------------//
class App extends React.Component {
  state = {
    gameStarted: false,

    modalDisplayed: false,

    vtBorder: L.geoJSON(borderData),

    centerView: {//the location of the current map center
      lat: 44,
      lng: -72.317
    },

    initialPoint: {//the location of the initial random point
      lat: 44,
      lng: -72.317
    }
  }

  getRandoLat() {//Random Lat using max and min lats for VT
    let lat = Math.random() * (45.005419 - 42.730315) + 42.730315;
    return lat;
  }

  getRandoLng() {//Random Lng using max and min lngs for VT
    let lng = (Math.random() * (71.510225 - 73.35218) + 73.35218) * -1;
    return lng;
  }

  startGame = () => {
    let randomLat = this.getRandoLat();
    let randomLng = this.getRandoLng();
    let layerArray = []

    while (layerArray.length === 0) {
      randomLat = this.getRandoLat();
      randomLng = this.getRandoLng();
      layerArray = LeafletPip.pointInLayer([randomLng, randomLat], L.geoJSON(borderData))
    };

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
  }

  giveUp = () => {//on quit button click
    this.setState({ gameStarted: false })
  }

  guess = () => {//on guess button click
    this.setState({
      modalDisplayed: true
    })
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

  //indv move functions for now, refactor down to generic later
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
    let { centerView, vtBorder, gameStarted, initialPoint, modalDisplayed } = this.state
    return (
      <div>
        <Modal modalDisplayed = {modalDisplayed}/>
        <div id="game-buttons">
          <button id="start" onClick={this.startGame} disabled={this.state.gameStarted}>Start</button>
          <button id="quit" onClick={this.giveUp} disabled={!this.state.gameStarted}>Give Up</button>
          <button id="guess" onClick={this.guess} disabled={!this.state.gameStarted}>Guess</button>
        </div>
        <div id="game-area">
          <button id="north" className="move-button" onClick={this.moveNorth} >Go North</button>
          <button id="south" className="move-button" onClick={this.moveSouth} >Go South</button>
          <button id="east" className="move-button" onClick={this.moveEast} >Go East</button>
          <button id="west" className="move-button" onClick={this.moveWest} >Go West</button>
          <Map centerView={centerView} vtBorder={vtBorder} gameStarted={gameStarted} initialPoint={initialPoint} />
        </div>
        <InfoBox />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)