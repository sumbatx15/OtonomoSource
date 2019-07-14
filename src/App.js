import React, { Component } from 'react'
import './App.scss'
import createStreamerFrom from './api/streamer'
import generateCarData from './api/data-generator'
import Input from './components/Input'
import Button from './components/Button'
import VinList from './components/VinList/VinList';
import CarList from './components/CarList/CarList';

class App extends Component {

  state = {
    vin: '',
    vins: [],
    error: ''
  }

  createStreamer = (vin) => {
    const streamer = createStreamerFrom(() => generateCarData(vin))
    streamer.subscribe(this.updateState)
    streamer.start()
    return streamer;
  }

  updateState = carData => {
    const { vins } = this.state;
    const i = vins.findIndex(vin => vin.vin === carData.vin)
    vins[i].carData = carData
    this.setState({ vins })
  }


  handleVinChange = ({ target }) => {
    this.setState({ vin: target.value })
  }
  isValid() {
    const { vin, vins } = this.state
    const trimmedVin = vin.trim();

    let isValid = true;

    if (!trimmedVin.length || trimmedVin.length < 5) {
      this.setState({ error: "Vin must be atleast 5 characters." })
      isValid = false
    }

    if (vins.find(v => v.vin === trimmedVin)){
      this.setState({ error: "You've already added this vin." })
      isValid = false;
    }

    return isValid
  }

  handleAddVin = () => {
    if (!this.isValid()) return;

    const { vin, vins } = this.state
    const streamer = this.createStreamer(vin)
    vins.push({ vin, isWatching: true, streamer })
    this.setState({ vin: '', vins, error: '' })
  }

  toggleWatch = (streamer, shouldWatch) => {
    shouldWatch ? streamer.start() : streamer.stop()
  }

  handleVinWatchingChange = (index) => {
    const { vins } = this.state
    const vin = vins[index]
    vin.isWatching = !vin.isWatching
    this.toggleWatch(vin.streamer, vin.isWatching)
    this.setState({ vins })
  }

  render() {
    const { vin, vins } = this.state;
    return (
      <div className="App">
        <div className="header">
          <i className="fas fa-3x fa-car"></i>
          <div className="title">
            <span>Welcome to</span>
            <span>VIN Watcher</span>
          </div>
        </div>
        <div className="content">
          <div className="vins-container">
            <div className="add-vin-input">
              <Input value={vin} onChange={this.handleVinChange} placeholder="Enter vin" />
              <Button onClick={this.handleAddVin}>Add VIN</Button>
              <span className="error">{this.state.error}</span>
            </div>
            <VinList vins={vins} onVinWatchChange={this.handleVinWatchingChange} />
          </div>
          <div className="cars-container">
            <CarList vins={vins} />
          </div>
        </div>
      </div>
    )
  }
}

export default App
