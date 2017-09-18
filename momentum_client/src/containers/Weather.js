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
      extWeatherAPI: [],
      zipCodeAPI: {},
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
    .then(this.openWeatherCall)
    .then(this.zipCodeCall)

    // fetch(`${ROOT_URL}&q=${11358},us`)
    // .then(response => response.json())
    // .then(data => this.setState({
    //   extWeatherAPI: data,
    // }))

    // fetch(`http://maps.googleapis.com/maps/api/geocode/json?address=${11373}&sensor=true`)
    // .then(response => response.json())
    // .then(data => this.setState({
    //   zipCodeAPI: data,
    // }))

  }

  openWeatherCall = () => {
    const API_KEY = '97e27a7129f7dc7d673c7a670793a180'
    const ROOT_URL = `http://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`

    fetch(`${ROOT_URL}&q=${11101},us`)
    .then(response => response.json())
    .then(data => this.setState({
      extWeatherAPI: data,
    }))

    // console.log(this.state.weatherData)
    // debugger
  }

  zipCodeCall = () => {
    fetch(`http://maps.googleapis.com/maps/api/geocode/json?address=${11101}&sensor=true`)
    .then(response => response.json())
    .then(data => this.setState({
      zipCodeAPI: data,
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
    let idRemoved = this.state.weatherData.filter(function(el) {
      return el.id !== id;
    });

    return fetch(`http://localhost:3000/api/v1/weathers/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then( res => res.json() )
    .then( data => this.setState({
      weatherData: idRemoved,
    }))
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
    let weatherIcons = {
      "01d": "wi wi-day-sunny",
      "02d": "wi wi-day-cloudy",
      "03d": "wi wi-cloud",
      "04d": "wi wi-cloudy",
      "09d": "wi wi-day-showers",
      "10d": "wi wi-day-rain",
      "11d": "wi wi-day-thunderstorm",
      "13d": "wi wi-day-snow",
      "50d": "wi wi-fog",
      "01n": "wi wi-night-clear",
      "02n": "wi wi-night-cloudy",
      "03n": "wi wi-cloud",
      "04n": "wi wi-cloudy",
      "09n": "wi wi-night-showers",
      "10n": "wi wi-night-showers",
      "11n": "wi wi-night-thunderstorm",
      "13n": "wi wi-night-snow",
      "50n": "wi wi-fog",
    }

    let weathers = (this.state.weatherData).map( weather => {
      return (
        <div>
          <div>{weather.city}</div>
          {/* <div className="change-alarm-button">Change</div> */}
          <div onClick={() => this.deleteWeather(weather.id)} className="delete-weather-button">DELETE</div>
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
            todaysDay = days[thisDay.getDay()].toUpperCase()
            if (eachWeather.dt_txt.slice(11) === "12:00:00") {
              todaysDesc = eachWeather.weather[0].description
              // todaysDescIcon = <img src={`http://openweathermap.org/img/w/${eachWeather.weather[0].icon}.png`} alt={eachWeather.weather[0].icon}></img>
              todaysDescIcon = eachWeather.weather[0].icon
            } else if (eachWeather.dt_txt.slice(11) === "18:00:00") {
              todaysDesc = eachWeather.weather[0].description
              // todaysDescIcon = <img src={`http://openweathermap.org/img/w/${eachWeather.weather[0].icon}.png`} alt={eachWeather.weather[0].icon}></img>
              todaysDescIcon = eachWeather.weather[0].icon
            } else {
              todaysDesc = eachWeather.weather[0].description
              // todaysDescIcon = <img src={`http://openweathermap.org/img/w/${eachWeather.weather[0].icon}.png`} alt={eachWeather.weather[0].icon}></img>
              todaysDescIcon = eachWeather.weather[0].icon
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
          {/* <div className="each-weather-icon">{todaysDescIcon}</div> */}
          <div className={`each-weather-icon ${weatherIcons[todaysDescIcon]}`}></div>
          {/* {todaysDescIcon} */}
          <div className="each-weather-desc">{todaysDesc}</div>
          <div className="temp each-weather-temp">
            <span className="each-weather-min">L{todaysMin}°</span> / <span className="each-weather-max">H{todaysMax}°</span>
          </div>
        </div>
      )
    })

    let filter = fiveDayWeather.slice(0, 5)

    console.log(list)
    let nowDate = new Date()
    let nowTemp = 0
    let nowDesc = ''
    let nowMin = 200
    let nowMax = 0
    let nowDay = ''
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    let nowDescIcon = ''

    if (this.state.extWeatherAPI.length === 0) {
      return null
    } else {
      nowTemp = Math.round(list[0].main.temp * 9/5 - 459.67)
      nowDesc = list[0].weather[0].description
      // nowDescIcon = <img src={`http://openweathermap.org/img/w/${list[0].weather[0].icon}.png`} alt={list[0].weather[0].icon}></img>
      nowDescIcon = list[0].weather[0].icon

      for (let i = 0; i < 5; i ++) {
        let eachWeather = list[i]
        let minTemp = eachWeather.main.temp_min
        let maxTemp = eachWeather.main.temp_max

        if (list[0].dt_txt.slice(0, 10) === eachWeather.dt_txt.slice(0, 10)) {
          if (nowMin > Math.round(minTemp * 9/5 - 459.67)) {
            nowMin = Math.round(minTemp * 9/5 - 459.67)
          }
          if (nowMax < Math.round(maxTemp * 9/5 - 459.67)) {
            nowMax = Math.round(maxTemp * 9/5 - 459.67)
          }
        }
      }
    }

    if (!this.state.addCity) {
      console.log(this.state.extWeatherAPI)
      return (
        <div className='weather-app'>
          {/* <h1>Weather</h1> */}

          <div className='todays-weather-wrapper'>
            {/* <div className='todays-weather-date'>{todaysDate.toJSON().slice(0, 10)}</div> */}
            {/* <div className='todays-weather-day'>{todaysDay}</div> */}
            <div className='todays-weather-town'>{(this.state.zipCodeAPI.results[0].address_components[1].long_name).toUpperCase()}</div>
            {/* <div>{todaysTemp}&#8457;</div> */}
            <div className='todays-weather-wrapper2'>
              {/* <div className='todays-weather-icon'>{nowDescIcon}</div> */}
              <div className={`todays-weather-icon ${weatherIcons[nowDescIcon]}`}></div>
              <div className='temp todays-weather-temp'>{nowTemp}°</div>
              <div className='todays-weather-wrapper3'>
                <div className='todays-weather-desc'>{nowDesc}</div>
                <div className='temp todays-weather-highlow'>L{nowMin}° /<span className="todays-weather-high">H{nowMax}°</span></div>
              </div>
            </div>
            {/* <div>L{todaysMin}&#8457;</div>
            <div>H{todaysMax}&#8457;</div> */}
          </div>
          <div className="five-day-weather-wrapper">
            {filter}
          </div>
          <div className='todays-weather-city'><span>{`< `}</span> {(this.state.zipCodeAPI.results[0].address_components[2].long_name).toUpperCase()} <span>{` >`}</span></div>
          {weathers}
          <div className='todays-weather-addcity'><a href="#" onClick={this.handleClick}>+ ADD CITY</a></div>
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
