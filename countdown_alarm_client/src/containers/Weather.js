import React, { Component } from 'react';
import AddWeatherCity from '../components/AddWeatherCity.js'
import '../styles/Weather.css';
import WeatherIcons from 'react-weathericons';

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

    ////
    let list = this.state.extWeatherAPI.list
    let fiveDates = []

    if (this.state.extWeatherAPI.length === 0) {
      return null
    } else {
      for (let i = 0; i < list.length; i ++) {
        if (fiveDates.includes(list[i].dt_txt.slice(0, 10))) {
          continue
        } else {
          fiveDates.push(list[i].dt_txt.slice(0, 10))
        }
      }
    }

    let fiveDayWeather = fiveDates.map( (date) => {
      let todaysMin = 200
      let todaysMax = 0
      let todaysDesc = ''
      let todaysDay = ''
      let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
      let todaysDescIcon = ''

      if (list.length === 0) {
        return null
      } else {
        for (let i = 0; i < list.length; i ++) {
          let eachWeather = list[i]
          let temp = eachWeather.main.temp
          let minTemp = eachWeather.main.temp_min
          let maxTemp = eachWeather.main.temp_max

          if (date === eachWeather.dt_txt.slice(0, 10)) {
            // console.log(eachWeather.dt_txt.getDay())
            var thisDay = new Date(date)
            todaysDay = days[thisDay.getDay()]
            if (eachWeather.dt_txt.slice(11) === "12:00:00") {
              todaysDesc = eachWeather.weather[0].description
              todaysDescIcon = <img src={`http://openweathermap.org/img/w/${eachWeather.weather[0].icon}.png`} alt={eachWeather.weather[0].icon}></img>
            }

            if (todaysMin > Math.round(minTemp * 9/5 - 459.67)) {
              todaysMin = Math.round(minTemp * 9/5 - 459.67)
              // fiveDay.push({date: todaysDate.toJSON().slice(0, 10), min: todaysMin})
            }
            if (todaysMax < Math.round(maxTemp * 9/5 - 459.67)) {
              todaysMax = Math.round(maxTemp * 9/5 - 459.67)
            }
          }
        }
      }

      return (
        <div className="each-weather">
          <div className="each-weather-date">{date}</div>
          <div className="each-weather-day">{todaysDay}</div>
          <div className="each-weather-icon">{todaysDescIcon}</div>
          <div className="each-weather-desc">{todaysDesc}</div>
          <div className="each-weather-temp">
            <span className="each-weather-max">{todaysMax}°</span> / <span className="each-weather-min">{todaysMin}°</span>
          </div>
        </div>
      )
    })

    // let list = json.list
    console.log(list)
    // debugger
    let todaysDate = new Date()
    // let arr = []
    let todaysTemp = 0
    let todaysDesc = ''
    let todaysMin = 200
    let todaysMax = 0
    let todaysDay = ''
    let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    let todaysDescIcon = ''

    if (this.state.extWeatherAPI.length === 0) {
      return null
    } else {
      todaysTemp = Math.round(list[0].main.temp * 9/5 - 459.67)
      todaysDesc = list[0].weather[0].description
      for (let i = 0; i < list.length; i ++) {
        let eachWeather = list[i]
        // let temp = eachWeather.main.temp
        let minTemp = eachWeather.main.temp_min
        let maxTemp = eachWeather.main.temp_max

        if (todaysDate.toJSON().slice(0, 10) === eachWeather.dt_txt.slice(0, 10)) {
          var thisDay = new Date()
          todaysDay = days[thisDay.getDay()]
          todaysDesc = (eachWeather.weather[0].description)
          todaysDescIcon = <img src={`http://openweathermap.org/img/w/${eachWeather.weather[0].icon}.png`} alt={eachWeather.weather[0].icon}></img>

          if (todaysMin > Math.round(minTemp * 9/5 - 459.67)) {
            todaysMin = Math.round(minTemp * 9/5 - 459.67)
            // todaysMin = Math.round(1.8 * (minTemp - 273) + 32)
          }
          if (todaysMax < Math.round(maxTemp * 9/5 - 459.67)) {
            todaysMax = Math.round(maxTemp * 9/5 - 459.67)
            // todaysMax = Math.round(1.8 * (maxTemp - 273) + 32)
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
          <div className='todays-weather-wrapper'>
            <div className='todays-weather-date'>{todaysDate.toJSON().slice(0, 10)}</div>
            <div className='todays-weather-day'>{todaysDay}</div>
            {/* <div>{todaysTemp}&#8457;</div> */}
            <div className='todays-weather-temp'>{todaysTemp}°</div>
            <div className='todays-weather-icon'>{todaysDescIcon}</div>
            <div className='todays-weather-desc'>{todaysDesc}</div>
            <div className='todays-weather-highlow'>L {todaysMin}° / H {todaysMax}°</div>
            {/* <div>L{todaysMin}&#8457;</div>
            <div>H{todaysMax}&#8457;</div> */}
          </div>
          {fiveDayWeather}
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
