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
  }

  setAddFive = () => {
    this.setState({
      minute: (this.state.minute + 5) % 60,
      second: (this.state.second + (5 * 60)) % 3600,
    })
  }

  setSubtractFive = () => {
    this.setState({
      minute: this.state.minute - 5,
      second: this.state.second - (5 * 60),
    })
  }

  setPomodoro = () => {
    this.setState({
      minute: 25,
      second: 25 * 60,
    })
  }

  setShortBreak = () => {
    this.setState({
      minute: 5,
      second: 5 * 60,
    })
  }

  setLongBreak = () => {
    this.setState({
      minute: 10,
      second: 10 * 60,
    })
  }

  startToggle = () => {
    let interval = setInterval(this.secondCounter, 1000)
    this.setState({
      start: !this.state.start,
      interval: interval
    })
  }

  cancelToggle = () => {
    this.setState({
      start: false,
      pause: false,
      hour: 0,
      minute: 0,
      second: 0,
    })
    clearInterval(this.state.interval)
  }

  pauseToggle = () => {
    this.setState({
      pause: !this.state.pause,
    })
    clearInterval(this.state.interval)
  }

  resumeToggle = () => {
    let interval = setInterval(this.secondCounter, 1000)
    this.setState({
      pause: !this.state.pause,
      interval: interval,
    })
  }

  secondCounter = () => {
    this.setState({
      hour: Math.floor(this.state.second / 3600),
      minute: Math.floor((this.state.second - 1) / 60),
      second: this.state.second - 1,
    })
  }

  render = () => {
    if (!this.state.start) {
      return (
        <div className="pomodoro">
          <h1>Pomodoro</h1>

          <div className="wrapper">
            <div className="category-box" onClick={this.setPomodoro}>Pomodoro</div>
            <div className="category-box" onClick={this.setShortBreak}>Short Break</div>
            <div className="category-box" onClick={this.setLongBreak}>Long Break</div><br/>
          </div>

          <div className="wrapper">
            {(this.state.minute === 0) ? <div className="addSubtract">-</div> : <div className="addSubtract" onClick={this.setSubtractFive}>-</div>}
            <div className="category-box">{this.state.hour} : {this.state.minute}</div>
            <div className="addSubtract" onClick={this.setAddFive}>+</div><br/>
          </div>

          {(this.state.minute === 0) ? null : <div className="category-box" onClick={this.startToggle}>Start</div>}
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
            {(!this.state.pause) ? <div className="category-box" onClick={this.pauseToggle}>Pause</div> : <div className="category-box" onClick={this.resumeToggle}>Resume</div>}
            <div className="category-box" onClick={this.cancelToggle}>Cancel</div>
          </div>
        </div>
      )
    }
  }
}

export default Pomodoro
