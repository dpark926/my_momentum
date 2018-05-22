import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import handleClick from '../actions/weatherActions';
import AddWeatherCity from '../components/AddWeatherCity.js';
import WeatherPost from './WeatherPost';
import '../styles/Weather.css';

class Weather extends Component {
  constructor () {
    super();

    this.state = {
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
    .then(() => console.log('zipCodeData success'))
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

  render = () => {
    let list = this.state.zipCodeData.map( (weather, num, arr) => {
      return (
        <Route
          path={`/weather/${weather.city}`}
          render={() => <WeatherPost
            zipCode={weather.city}
            previousZipCode={arr[num - 1] ? arr[num - 1].city : null}
            nextZipCode={arr[num + 1] ? arr[num + 1].city : null}
            id={weather.id}
            addWeather={this.addToWeather}
            error={this.state.error}
            zipCodeData={this.state.zipCodeData}
            deleteWeather={this.deleteWeather}
          />}
        />
      )
    })

    if (this.state.zipCodeData.length !== 0) {
      return (
        <div className='weatherContainer'>
          <Redirect to={`/weather/${this.state.zipCodeData[0].city}`}/>
          {list}
        </div>
      )
    } else {
      return (
        <div className='weatherContainer'>
          <div className='loadingWrapper'>
            <h1>LOADING...</h1>
          </div>
        </div>
      )
    }
  }
}

const mapStateToProps = state => {
  return state.weatherReducer;
};

const mapActionsToProps = {
  // handleClick: handleClick.handleClick,
  // handleOrigin: handleType.handleTypedOrigin
}

export default connect( mapStateToProps, mapActionsToProps )( Weather );
