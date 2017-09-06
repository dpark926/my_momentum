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
      extWeatherAPI: []
    }
  }

  componentWillMount = () => {
    const URL = 'http://localhost:3000/api/v1/weathers'
    const API_KEY = '97e27a7129f7dc7d673c7a670793a180'
    const ROOT_URL = `http://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`

    fetch(URL)
    .then(response => response.json())
    .then(data => this.setState({
      weatherData: data,
      error: ''
    }))

    fetch(`${ROOT_URL}&q=${11101},us`)
    .then(response => response.json())
    .then(data => this.setState({
      extWeatherAPI: data,
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

  deleteWeather = (id) => {
    return fetch(`http://localhost:3000/api/v1/weathers/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then( res => res.json() )
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
    let weathers = (this.state.weatherData).map( weather => {
      return (
        <div>
          <div>{weather.city}</div>
          {/* <div className="change-alarm-button">Change</div> */}
          <div onClick={() => this.deleteWeather(weather.id)} className="delete-weather-button">Delete</div>
        </div>
      )
    })

    // let list = json.list
    let list = this.state.extWeatherAPI.list
    console.log(list)
    // debugger
    let todaysDate = new Date()
    // let arr = []
    let todaysMin = 200
    let todaysMax = 0

    if (this.state.extWeatherAPI.length === 0) {
      return null
    } else {
      for (let i = 0; i < list.length; i ++) {
        let eachWeather = list[i]
        let temp = eachWeather.main.temp
        let minTemp = eachWeather.main.temp_min
        let maxTemp = eachWeather.main.temp_max

        if (todaysDate.toJSON().slice(0, 10) === eachWeather.dt_txt.slice(0, 10)) {
          if (todaysMin > Math.round(minTemp * 9/5 - 459.67)) {
            todaysMin = Math.round(minTemp * 9/5 - 459.67)
          }
          if (todaysMax < Math.round(maxTemp * 9/5 - 459.67)) {
            todaysMax = Math.round(maxTemp * 9/5 - 459.67)
          }
        }
      }
    }

    if (!this.state.addCity) {
      console.log(this.state.extWeatherAPI)
      return (
        <div>
          <h1>Weather</h1>
          <a href="#" onClick={this.handleClick}>+ Add City</a>
          {weathers}
          <div>{todaysDate.toJSON().slice(0, 10)}</div>
          <div>High: {todaysMax}&deg</div>
          <div>Low: {todaysMin}&#8451;</div>
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
