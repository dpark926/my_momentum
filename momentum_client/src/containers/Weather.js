import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom'
import AddWeatherCity from '../components/AddWeatherCity.js';
import WeatherPost from './WeatherPost';
import '../styles/Weather.css';

class Weather extends Component {
  constructor () {
    super();

    this.state = {
      addCityToggleButton: false,
      input: '',
      zipCodeData: [],
      error: '',
    }
  }

  /**
   * GET request to the local server that returns a list of all zip codes (string).
   */
  componentWillMount = () => {
    const URL = 'http://localhost:3000/api/v1/weathers'

    fetch(URL)
    .then(response => response.json())
    .then(data => this.setState({
      zipCodeData: data
    }))
    .catch(err => console.log(err))
  }

  /**
   * An event handler that makes a POST request with the zip code input and
   * updated the the state by concatenating to the existing array.
   * Validates if the zip code is a five digit number that doesn't start with 0.
   */
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
        zipCodeData: this.state.zipCodeData.concat([data]),
        addCityToggleButton: !this.state.addCityToggleButton,
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

  /**
   * An event handler that makes a DELETE request with the zip code input and
   * updating the state.
   */
  deleteWeather = (id) => {
    let idRemoved = this.state.zipCodeData.filter(function(el) {
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
      zipCodeData: idRemoved,
    }))
  }

  /**
  * An event handler that toggles the display between the 5-day weather forecast
  * or the input for the zip code.
  */
  handleClick = () => {
    this.setState({
      addCityToggleButton: !this.state.addCityToggleButton,
    })
  }

  /**
  * An event handler that handles the input of the zip code.
  */
  handleInput = (event) => {
    this.setState({
      input: event.target.value
    })
  }

  render = () => {
    let zipcodeList = this.state.zipCodeData.map( zipcode => {
      return (
        <Route exact path='/weather/1' render={() => <WeatherPost
          zipCode={zipcode.city}
        />}/>
      )
    })
    /**
     * Toggling between the display of the 5-day weather forecast or the section to add a new zipcode.
     */
    if (!this.state.addCityToggleButton) {
      return (
        <div>
          <Redirect to='/weather/1'/>
          <Route path='/weather/1' render={() => <WeatherPost
            zipCode='11372'
          />}/>
          <Route path='/weather/2' render={() => <WeatherPost
            zipCode='11358'
          />}/>
          {/* {zipcodeList} */}
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
