import React, { Component } from 'react';
import AddWeatherCity from '../components/AddWeatherCity.js'

class Weather extends Component {
  constructor () {
    super()

    this.state = {
      addCity: false,
      input: '',
      weatherData: [],
      error: '',
    }
  }

  componentWillMount = () => {
    const URL = 'http://localhost:3000/api/v1/weathers'

    fetch(URL)
    .then(response => response.json())
    .then(data => this.setState({
      weatherData: data,
      error: ''
    }))
  }

  addToWeather = (event) => {
    event.preventDefault()

    if (/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(parseInt(this.state.input))) {
      fetch('http://localhost:3000/api/v1/weathers', {
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
        weatherData: this.state.weatherData.concat([data]),
        addCity: !this.state.addCity,
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
      addCity: !this.state.addCity,
    })
  }

  handleInput = (event) => {
    this.setState({
      input: event.target.value
    })
  }

  render = () => {
    // let weathers = (this.state.weatherData).map( weather => {
    //   let splitTime = alarm.time.split(":")
    //   let hour = splitTime[0];
    //   let minute = splitTime[1];
    //   let id = alarm.id
    //   let newHour = ''
    //   let newMinute = ''
    //
    //   if (hour < 10) {
    //     newHour = "0" + hour
    //   } else {
    //     newHour = hour
    //   }
    //
    //   if (minute < 10) {
    //     newMinute = "0" + minute
    //   } else {
    //     newMinute = minute
    //   }
    //
    //   return (
    //     <div className="alarm-box">
    //       <div className="alarm-label">{alarm.label}</div>
    //       <div className="alarm-time-day-wrapper">
    //         <div className="alarm-time">{newHour}:{newMinute}<span className="am">{alarm.am ? "AM" : "PM"}</span></div>
    //         <div className="active-day-wrapper">
    //           {alarm.sunday ? <div className="active-day">S</div> : <div className="inactive-day">S</div>}
    //           {alarm.monday ? <div className="active-day">M</div> : <div className="inactive-day">M</div>}
    //           {alarm.tuesday ? <div className="active-day">T</div> : <div className="inactive-day">T</div>}
    //           {alarm.wednesday ? <div className="active-day">W</div> : <div className="inactive-day">W</div>}
    //           {alarm.thursday ? <div className="active-day">T</div> : <div className="inactive-day">T</div>}
    //           {alarm.friday ? <div className="active-day">F</div> : <div className="inactive-day">F</div>}
    //           {alarm.saturday ? <div className="active-day">S</div> : <div className="inactive-day">S</div>}
    //         </div>
    //       </div>
    //       <div className="on-off-toggle">On/Off</div>
    //       <div className="change-alarm-button">Change</div>
    //       <div onClick={() => this.deleteAlarm(id)} className="delete-alarm-button">Delete</div>
    //     </div>
    //   )
    // })

    if (!this.state.addCity) {
      return (
        <div>
          <h1>Weather</h1>
          <a href="#" onClick={this.handleClick}>+ Add City</a>
        </div>
      )
    } else {
      return (
        <div>
          <h1>Weather</h1>
          <AddWeatherCity handleInput={this.handleInput} addToWeather={this.addToWeather} input={this.state.input}/>
          <div>Input: {this.state.input}</div>
          <div>{this.state.error}</div>
        </div>
      )
    }
  }
}

export default Weather
