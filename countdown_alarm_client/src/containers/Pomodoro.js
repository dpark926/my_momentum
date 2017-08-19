import React, {Component} from 'react'

class Pomodoro extends Component {
  constructor () {
    super()

    this.state = {
      start: false,
      hour: 0,
      minute: 0,
      second: 0,
    }

    this.handleStart = this.handleStart.bind(this)
  }

  handleStart () {
    this.setState({
      start: !this.state.start
    })
  }

  render () {
    if (!this.state.start) {
      return (
        <div>
          <h1>Pomodoro</h1>
          <div>{this.state.hour} : {this.state.minute}</div>
          <div onClick={this.handleStart}>Start</div>
        </div>
      )
    } else {
      return (
        <div>
          <h1>Pomodoro</h1>
          <div>{this.state.hour} : {this.state.minute} : {this.state.second}</div>
          <div>Pause</div>
          <div>Resume</div>
          <div onClick={this.handleStart}>Cancel</div>
        </div>
      )
    }
  }
}

export default Pomodoro
