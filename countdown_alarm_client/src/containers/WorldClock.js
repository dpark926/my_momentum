import React, { Component } from 'react';
import AddWorldClock from '../components/AddWorldClock.js'

class WorldClock extends Component {
  constructor () {
    super()

    this.state = {
      addWorldClock: false,
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.setState({
      addWorldClock: !this.state.addWorldClock,
    })
  }

  render () {
    if (!this.state.addWorldClock) {
      return (
        <div>
          <h1>World Clock</h1>
          <a href="#" onClick={this.handleClick}>+ Add City</a>
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
