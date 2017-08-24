import React, { Component } from 'react';
import SetTime from '../components/SetTime.js'

class Alarm extends Component {
  constructor () {
    super()

    this.state = {
      setTime: false,
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick = () => {
    this.setState({
      setTime: !this.state.setTime,
    })
  }

  render = () => {
    if (!this.state.setTime) {
      return (
        <div>
          <h1>Alarm</h1>
          <a href="#" onClick={this.handleClick}>+ Add Alarm</a>
        </div>
      )
    } else {
      return (
        <div>
          <h1>Alarm</h1>
          <SetTime/>
        </div>
      )
    }
  }
}

export default Alarm
