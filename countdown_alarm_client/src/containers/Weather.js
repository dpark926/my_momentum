import React, { Component } from 'react';
import AddCity from '../components/AddCity.js'

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
    if (!this.state.setTime) {
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
          <AddCity/>
        </div>
      )
    }
  }
}

export default Weather
