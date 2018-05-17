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
    const lowTime = this.state.minute < 5 ? {color: '#ff6f69'} : null

    if (!this.state.start) {
      return (
        <div className="pomodoro">
          <div className="pomodoroNavWrapper">
            <div className="category-box" onClick={this.setPomodoro}>POMODORO</div>
            <div className="category-box" onClick={this.setShortBreak}>SHORT BREAK</div>
            <div className="category-box" onClick={this.setLongBreak}>LONG BREAK</div><br/>
          </div>

          <h1>POMODORO</h1>

          <div className="pomodoroBody">
            <div className='timeWrapper'>
              {(this.state.minute === 0) ? <div className="addSubtract">-</div> : <div className="addSubtract" onClick={this.setSubtractFive}>-</div>}
              {/* <div className="pomodoro-time">{this.state.hour} : {this.state.minute}</div> */}
              <div className="pomodoro-time">{this.state.minute} MIN</div>
              <div className="addSubtract" onClick={this.setAddFive}>+</div><br/>
            </div>
            {(this.state.minute === 0) ? <div className="black-category-box"></div> : <div className="category-box" onClick={this.startToggle}>START</div>}
          </div>

        </div>
      )
    } else {
      return (
        <div className="pomodoro">
          <div className="pomodoroNavWrapper">
            <div className="category-box" onClick={this.setPomodoro}>POMODORO</div>
            <div className="category-box" onClick={this.setShortBreak}>SHORT BREAK</div>
            <div className="category-box" onClick={this.setLongBreak}>LONG BREAK</div><br/>
          </div>

          <h1>POMODORO</h1>

          <div className="pomodoroBody">
            <div className="timeWrapper">
              <div className="pomodoro-time" style={lowTime}>{Math.floor(((this.state.minute) % 60) / 10)}{(this.state.minute) % 10} : {Math.floor(((this.state.second) % 60) / 10)}{(this.state.second) % 10}</div><br/>
            </div>

            <div className="timeWrapper">
              {(!this.state.pause) ? <div className="category-box" onClick={this.pauseToggle}>PAUSE</div> : <div className="category-box" onClick={this.resumeToggle}>RESUME</div>}
              <div className="category-box" onClick={this.cancelToggle}>CANCEL</div>
            </div>
          </div>
        </div>
      )
    }
  }
}

export default Pomodoro
