import React, {Component} from 'react'

class Pomodoro extends Component {
  constructor () {
    super()

    this.state = {
      start: false,
      pause: false,
      hour: 0,
      minute: 0,
      second: 0,
    }

    this.setAddFive = this.setAddFive.bind(this)
    this.setSubtractFive = this.setSubtractFive.bind(this)
    this.startToggle = this.startToggle.bind(this)
    this.setPomodoro = this.setPomodoro.bind(this)
    this.setShortBreak = this.setShortBreak.bind(this)
    this.setLongBreak = this.setLongBreak.bind(this)
    this.cancelToggle = this.cancelToggle.bind(this)
    this.pauseToggle = this.pauseToggle.bind(this)
    this.secondCounter = this.secondCounter.bind(this)
  }

  setAddFive() {
    this.setState({
      minute: (this.state.minute + 5) % 60,
      second: (this.state.second + (5 * 60)) % 3600,
    })
  }

  setSubtractFive() {
    this.setState({
      minute: this.state.minute - 5,
      second: this.state.second - (5 * 60),
    })
  }

  setPomodoro () {
    this.setState({
      minute: 25,
      second: 25 * 60,
    })
  }

  setShortBreak () {
    this.setState({
      minute: 5,
      second: 5 * 60,
    })
  }

  setLongBreak () {
    this.setState({
      minute: 10,
      second: 10 * 60,
    })
  }

  startToggle () {
    this.setState({
      start: !this.state.start,
    })
    setInterval(this.secondCounter, 1000)
  }

  cancelToggle () {
    this.setState({
      start: !this.state.start,
      hour: 0,
      minute: 0,
      second: 0,
    })
    // clearInterval(this.startToggle)
  }

  pauseToggle () {
    this.setState({
      pause: !this.state.pause,
    })
  }

  secondCounter () {
    this.setState({
      hour: Math.floor(this.state.second / 3600),
      minute: Math.floor((this.state.second - 1) / 60),
      second: this.state.second - 1,
    })
  }

  render () {
    if (!this.state.start) {
      if (this.state.minute === 0) {
        return (
          <div>
            <h1>Pomodoro</h1>
            <div onClick={this.setSubtractFive}>-</div>
            <div onClick={this.setAddFive}>+</div>
            <div>{this.state.hour} : {this.state.minute}</div>
            <div onClick={this.setPomodoro}>Pomodoro</div>
            <div onClick={this.setShortBreak}>Short Break</div>
            <div onClick={this.setLongBreak}>Long Break</div><br/>
          </div>
        )
      } else {
        return (
          <div>
            <h1>Pomodoro</h1>
            <div onClick={this.setSubtractFive}>-</div>
            <div onClick={this.setAddFive}>+</div>
            <div>{this.state.hour} : {this.state.minute}</div>
            <div onClick={this.setPomodoro}>Pomodoro</div>
            <div onClick={this.setShortBreak}>Short Break</div>
            <div onClick={this.setLongBreak}>Long Break</div><br/>
            <div onClick={this.startToggle}>Start</div>
          </div>
        )
      }
    } else {
      if (!this.state.pause) {
        return (
          <div>
            <h1>Pomodoro</h1>
            <div>{this.state.hour} : {Math.floor(((this.state.minute) % 60) / 10)}{(this.state.minute) % 10} : {Math.floor(((this.state.second) % 60) / 10)}{(this.state.second) % 10}</div>
            <div onClick={this.pauseToggle}>Pause</div><br/>
            <div onClick={this.cancelToggle}>Cancel</div>
          </div>
        )
      } else {
        return (
          <div>
            <h1>Pomodoro</h1>
            <div>{this.state.hour} : {Math.floor(((this.state.minute) % 60) / 10)}{(this.state.minute) % 10} : {Math.floor(((this.state.second) % 60) / 10)}{(this.state.second) % 10}</div>
            <div onClick={this.pauseToggle}>Resume</div><br/>
            <div onClick={this.cancelToggle}>Cancel</div>
          </div>
        )
      }
    }
  }
}

export default Pomodoro
