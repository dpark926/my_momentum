import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AddWeatherCity from '../components/AddWeatherCity.js'
import WeatherIcons from 'react-weathericons';
import '../styles/WeatherPost.css';

class WeatherPost extends Component {
  constructor (props) {
    super(props);

    this.state = {
      zipCode: this.props.zipCode,
      openWeatherData: [],
      googleGeoCode: {},
    }
  }

  /**
   * GET request that returns weather data for the next 5 days .
   * Each object contains weather information in 3-hour increments that
   * is based on a zip code.
   */

   /**
    * GET request that returns a geocode data that includes the city name for the zip code.
    */
  componentWillMount = () => {
    const API_KEY = '97e27a7129f7dc7d673c7a670793a180'
    const ROOT_URL = `http://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`

    fetch(`${ROOT_URL}&q=${this.state.zipCode},us`)
    .then(response => response.json())
    .then(data => this.setState({
      openWeatherData: data,
    }))
    .catch(err => console.log(err))
    .then(() => console.log('openweathermap success'))

    fetch(`http://maps.googleapis.com/maps/api/geocode/json?address=${this.state.zipCode}&sensor=true`)
    .then(response => response.json())
    .then(data => this.setState({
      googleGeoCode: data,
    }))
    .catch(err => console.log(err))
    .then(() => console.log('google geocode success'))
  }

  render = () => {
    const weatherIcons = {
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

    if (this.state.openWeatherData.length === 0) {
      return null
    }

    const list = this.state.openWeatherData.list

    /**
     * Parsing through all weather objects and filter to have an array
     * with unique dates.
     */
    const fiveDates = []

    for (let i = 0; i < list.length; i ++) {
      if (fiveDates.includes(list[i].dt_txt.slice(0, 10))) {
        continue
      }
      fiveDates.push(list[i].dt_txt.slice(0, 10))
    }

    /**
     * Maps each date in the fiveDates array and assigns the high, low, and
     * current temperature.
     * The weather icon is based on the current weather description.
     * Coverts Kelvin to Fahrenheit
     */
    let fiveDayWeather = fiveDates.map( (date) => {
      let todaysMin = 200
      let todaysMax = 0
      let todaysDesc = ''
      let todaysDay = ''
      const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
      let todaysDescIcon = ''

      for (let i = 0; i < list.length; i ++) {
        const eachWeather = list[i]

        if (date !== eachWeather.dt_txt.slice(0, 10)) {
          continue
        }

        const temp = eachWeather.main.temp
        const minTemp = eachWeather.main.temp_min
        const maxTemp = eachWeather.main.temp_max
        const thisDay = new Date(date)

        todaysDay = days[thisDay.getDay()].toUpperCase()
        if (eachWeather.dt_txt.slice(11) === "12:00:00") {
          todaysDesc = eachWeather.weather[0].description
          todaysDescIcon = eachWeather.weather[0].icon
        } else if (eachWeather.dt_txt.slice(11) === "18:00:00") {
          todaysDesc = eachWeather.weather[0].description
          todaysDescIcon = eachWeather.weather[0].icon
        } else {
          todaysDesc = eachWeather.weather[0].description
          todaysDescIcon = eachWeather.weather[0].icon
        }

        if (todaysMin > Math.round(minTemp * 9/5 - 459.67)) {
          todaysMin = Math.round(minTemp * 9/5 - 459.67)
        }
        if (todaysMax < Math.round(maxTemp * 9/5 - 459.67)) {
          todaysMax = Math.round(maxTemp * 9/5 - 459.67)
        }
      }

      return (
        <div className="each-weather">
          <div className='each-weather-section'>
            <div className="each-weather-date">{date}</div>
            <div className="each-weather-day">{todaysDay}</div>
          </div>
          <div className='each-weather-section'>
            <div className={`each-weather-icon ${weatherIcons[todaysDescIcon]}`}></div>
            <div className="each-weather-desc">{todaysDesc}</div>
          </div>
          <div className='each-weather-section'>
            <div className="temp each-weather-temp">
              <span className="each-weather-min">L{todaysMin}°</span> / <span className="each-weather-max">H{todaysMax}°</span>
            </div>
          </div>
        </div>
      )
    })

    /**
     * This section is for the current weather.
     */
    let filter = fiveDayWeather.slice(0, 5)
    const nowDate = new Date()
    let nowTemp = 0
    let nowDesc = ''
    let nowMin = 200
    let nowMax = 0
    let nowDay = ''
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    let nowDescIcon = ''

    if (this.state.openWeatherData.length === 0) {
      return null
    } else {
      nowTemp = Math.round(list[0].main.temp * 9/5 - 459.67)
      nowDesc = list[0].weather[0].description
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

    /**
     * Toggling between the display of the 5-day weather forecast or the section to add a new zipcode.
     */
    if (!this.props.addCityToggleButton) {
      return (
        <div className='weather-app'>
          <div className='weather-wrapper'>
            <div className='todays-weather-wrapper'>
              <div className='todays-weather-town'>{(this.state.googleGeoCode.results[0].address_components[1].long_name).toUpperCase()}</div>
              <div className='todays-weather-wrapper2'>
                <div className={`todays-weather-icon ${weatherIcons[nowDescIcon]}`}></div>
                <div className='temp todays-weather-temp'>{nowTemp}°</div>
                <div className='todays-weather-wrapper3'>
                  <div className='todays-weather-desc'>{nowDesc}</div>
                  <div className='temp todays-weather-highlow'>L{nowMin}° /<span className="todays-weather-high">H{nowMax}°</span></div>
                </div>
              </div>
            </div>
            <div className="five-day-weather-wrapper">
              {filter}
            </div>
            <div className='todays-weather-city-wrapper'>
              { this.props.previousZipCode === null ?
                <span className='todays-weather-city-button' style={{color: 'gray'}}>{`< `}</span> :
                <Link to={`/weather/${this.props.previousZipCode}`} className='todays-weather-city-link'>
                  <span className='todays-weather-city-button'>{`< `}</span>
                </Link>
              }
              <span>{(this.state.googleGeoCode.results[0].address_components[2].long_name).toUpperCase()}</span>
              { this.props.nextZipCode === null ?
                <span className='todays-weather-city-button' style={{color: 'gray'}}>{`> `}</span> :
                <Link to={`/weather/${this.props.nextZipCode}`} className='todays-weather-city-link'>
                  <span className='todays-weather-city-button'>{` >`}</span>
                </Link>
              }
            </div>
            <div className='todays-weather-addcity'><a href="#" onClick={this.props.handleClick}>+ ADD CITY</a></div>
            <Link to={ this.props.nextZipCode ? `/weather/${this.props.nextZipCode}` : `/weather/${this.props.previousZipCode}` } className='todays-weather-city-link'>
              <div onClick={() => this.props.deleteWeather(this.props.id)} className="delete-weather-button">DELETE THIS CITY</div>
            </Link>
          </div>
        </div>
      )
    } else {
      return (
        <div className='addCityContainer'>
          <h1>Weather</h1>
          <AddWeatherCity handleInput={this.props.handleInput} addToWeather={this.props.addWeather} input={this.props.input}/>
          <div>{this.props.error}</div>
          <div onClick={this.props.handleClick} className='addCityCancelButton'>Cancel</div>
        </div>
      )
    }
  }
}

export default WeatherPost;
