import React, { Component } from 'react';
import AddWeatherCity from '../components/AddWeatherCity.js'

class Weather extends Component {
  constructor () {
    super()

    this.state = {
      addCity: false,
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.setState({
      addCity: !this.state.addCity,
    })
  }

  render () {
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
          <AddWeatherCity/>
        </div>
      )
    }
  }
}

export default Weather
