import React, { Component } from 'react';
import AddWorldClock from '../components/AddWorldClock.js'

class WorldClock extends Component {
  constructor () {
    super()

    this.state = {
      addWorldClock: false,
    }
  }

  handleClick = () => {
    this.setState({
      addWorldClock: !this.state.addWorldClock,
    })
  }

  render = () => {
    if (!this.state.addWorldClock) {
      return (
        <div>
          <h1>World Clock</h1>
          <a href="#" onClick={this.handleClick}>+ Add City</a>
          <i className="wi wi-night-sleet"></i>
          <i className="fa fa-snowflake-o" aria-hidden="true"></i>
          <div className="origin-destination-middle fa fa-long-arrow-right" id="arrow-right"></div>
        </div>
      )
    } else {
      return (
        <div>
          <h1>World Clock</h1>
          <AddWorldClock/>
        </div>
      )
    }
  }
}

export default WorldClock
