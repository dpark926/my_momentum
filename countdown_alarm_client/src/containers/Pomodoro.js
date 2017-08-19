import React, {Component} from 'react'

class Pomodoro extends Component {
  constructor () {
    super()

    this.state = {
      start: false,
      hour: 0,
      minute: 0,
      second: 60,
    }

    this.setAddFive = this.setAddFive.bind(this)
    this.setSubtractFive = this.setSubtractFive.bind(this)
    this.startToggle = this.startToggle.bind(this)
    this.setPomodoro = this.setPomodoro.bind(this)
    this.setShortBreak = this.setShortBreak.bind(this)
    this.setLongBreak = this.setLongBreak.bind(this)
    this.cancelToggle = this.cancelToggle.bind(this)
    this.secondCounter = this.secondCounter.bind(this)
  }

  setAddFive() {
    this.setState({
      minute: this.state.minute + 5,
    })
  }

  setSubtractFive() {
    this.setState({
      minute: this.state.minute - 5,
    })
  }

  setPomodoro () {
    this.setState({
      minute: 25,
    })
  }

  setShortBreak () {
    this.setState({
      minute: 5,
    })
  }

  setLongBreak () {
    this.setState({
      minute: 10,
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

  secondCounter () {
    this.setState({
      second: this.state.second - 1
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
      return (
        <div>
          <h1>Pomodoro</h1>
          <div>{this.state.hour} : {this.state.minute} : {this.state.second}</div>
          <div>Pause</div>
          <div>Resume</div><br/>
          <div onClick={this.cancelToggle}>Cancel</div>
        </div>
      )
    }
  }
}

export default Pomodoro
