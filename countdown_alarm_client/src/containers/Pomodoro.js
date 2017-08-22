import React, {Component} from 'react'
import '../styles/Pomodoro.css'

class Pomodoro extends Component {
  constructor () {
    super()

    this.state = {
      interval: 0,
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
    this.resumeToggle = this.resumeToggle.bind(this)
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
    let interval = setInterval(this.secondCounter, 1000)
    this.setState({
      start: !this.state.start,
      interval: interval
    })
  }

  cancelToggle () {
    this.setState({
      start: !this.state.start,
      hour: 0,
      minute: 0,
      second: 0,
    })
    clearInterval(this.state.interval)
  }

  pauseToggle () {
    this.setState({
      pause: !this.state.pause,
    })
    clearInterval(this.state.interval)
  }

  resumeToggle () {
    let interval = setInterval(this.secondCounter, 1000)
    this.setState({
      pause: !this.state.pause,
      interval: interval,
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
          <div className="pomodoro">
            <h1>Pomodoro</h1>

            <div className="wrapper">
              <div className="category-box" onClick={this.setPomodoro}>Pomodoro</div>
              <div className="category-box" onClick={this.setShortBreak}>Short Break</div>
              <div className="category-box" onClick={this.setLongBreak}>Long Break</div><br/>
            </div>

            <div className="wrapper">
              <div className="addSubtract">-</div>
              <div className="category-box">{this.state.hour} : {this.state.minute}</div>
              <div className="addSubtract" onClick={this.setAddFive}>+</div><br/>
            </div>
          </div>
        )
      } else {
        return (
          <div className="pomodoro">
            <h1>Pomodoro</h1>

            <div className="wrapper">
              <div className="category-box" onClick={this.setPomodoro}>Pomodoro</div>
              <div className="category-box" onClick={this.setShortBreak}>Short Break</div>
              <div className="category-box" onClick={this.setLongBreak}>Long Break</div><br/>
            </div>

            <div className="wrapper">
              <div className="addSubtract" onClick={this.setSubtractFive}>-</div>
              <div className="category-box">{this.state.hour} : {this.state.minute}</div>
              <div className="addSubtract" onClick={this.setAddFive}>+</div><br/>
            </div>

            <div className="category-box" onClick={this.startToggle}>Start</div>
          </div>
        )
      }
    } else {
      if (!this.state.pause) {
        return (
          <div className="pomodoro">
            <h1>Pomodoro</h1>

            <div className="wrapper">
              <div className="category-box">{this.state.hour} : {Math.floor(((this.state.minute) % 60) / 10)}{(this.state.minute) % 10} : {Math.floor(((this.state.second) % 60) / 10)}{(this.state.second) % 10}</div><br/>
            </div>

            <div className="wrapper">
              <div className="category-box" onClick={this.pauseToggle}>Pause</div>
              <div className="category-box" onClick={this.cancelToggle}>Cancel</div>
            </div>
          </div>
        )
      } else {
        return (
          <div className="pomodoro">
            <h1>Pomodoro</h1>

            <div className="wrapper">
              <div className="category-box">{this.state.hour} : {Math.floor(((this.state.minute) % 60) / 10)}{(this.state.minute) % 10} : {Math.floor(((this.state.second) % 60) / 10)}{(this.state.second) % 10}</div><br/>
            </div>

            <div className="wrapper">
              <div className="category-box" onClick={this.resumeToggle}>Resume</div>
              <div className="category-box" onClick={this.cancelToggle}>Cancel</div>
            </div>
          </div>
        )
      }
    }
  }
}

export default Pomodoro
