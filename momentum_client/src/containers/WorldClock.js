import React, { Component } from 'react';
import AddWorldClock from '../components/AddWorldClock.js'
import AddWeatherCity from '../components/AddWeatherCity.js'

class WorldClock extends Component {
  constructor () {
    super()

    this.state = {
      addWorldClock: false,
      worldClockData: [],
      input: '',
      error: '',
    }
  }

  // countingMinute = () => {
  //   let d = new Date()
  //   this.setState({
  //     day: d.getDay(),
  //     month: d.getMonth(),
  //     date: d.getDate(),
  //     year: d.getFullYear(),
  //     hour: d.getHours(),
  //     minute: d.getMinutes(),
  //     // second: d.getSeconds(),
  //     // milliseconds: d.getMilliseconds(),
  //     // time: d.toLocaleTimeString()
  //   })
  // }
  //
  // componentWillMount = () => {
  //   setInterval(this.countingMinute, 60000)
  // }

  componentWillMount = () => {
    const URL = 'http://localhost:3000/api/v1/world_clocks'

    fetch(URL)
    .then(response => response.json())
    .then(data => this.setState({
      worldClockData: data,
      error: '',
    }))
  }

  addToWeather = (event) => {
    event.preventDefault()

    if (/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(parseInt(this.state.input))) {
      fetch('http://localhost:3000/api/v1/world_clocks', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          city: this.state.input
        })
      })
      .then( res => res.json() )
      .then( data => this.setState({
        worldClockData: this.state.worldClockData.concat([data]),
        addWorldClock: !this.state.addWorldClock,
        input: '',
        error: '',
      }))
    } else {
      this.setState({
        error: "Please enter a valid zip code",
        input: ''
      })
      document.getElementById("weather-form").reset()
    }
  }

  handleClick = () => {
    this.setState({
      addWorldClock: !this.state.addWorldClock,
    })
  }

  handleInput = (event) => {
    this.setState({
      input: event.target.value
    })
  }

  render = () => {
    let worldClocks = this.state.worldClockData.map(worldClock => {
      return (
        <div>{worldClock.city}</div>
      )
    })

    if (!this.state.addWorldClock) {
      return (
        <div>
          <h1>World Clock</h1>
          {/* <div className="alarm-add-alarm">{this.state.alarmData.length < 5 ? <a href="#" onClick={this.handleClick}><div className="alarm-box-button" >+ Add Alarm</div></a> : null}</div> */}
          {this.state.worldClockData.length <= 5 ? <a href="#" onClick={this.handleClick}>+ Add City</a> : null}
          {worldClocks}
          {/* <i className="wi wi-night-sleet"></i>
          <i className="fa fa-snowflake-o" aria-hidden="true"></i>
          <div className="origin-destination-middle fa fa-long-arrow-right" id="arrow-right"></div> */}
        </div>
      )
    } else {
      return (
        <div>
          <h1>World Clock</h1>
          {/* <AddWorldClock/> */}
          <AddWeatherCity handleInput={this.handleInput} addToWeather={this.addToWeather} input={this.state.input}/>
          {this.state.input}
          <div>{this.state.error}</div>

        </div>
      )
    }
  }
}

export default WorldClock
