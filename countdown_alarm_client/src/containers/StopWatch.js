import React, {Component} from 'react'

class StopWatch extends Component {
  constructor () {
    super()

    this.state = {
      start: false,
      interval: 0,
      pause: false,
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
      lap: [],
    }

    this.startToggle = this.startToggle.bind(this)
    this.pauseToggle = this.pauseToggle.bind(this)
    this.resumeToggle = this.resumeToggle.bind(this)
    this.resetToggle = this.resetToggle.bind(this)
    this.secondCounter = this.secondCounter.bind(this)
    this.addToLap = this.addToLap.bind(this)
  }

  startToggle () {
    let interval = setInterval(this.secondCounter, 10)
    this.setState({
      start: !this.state.start,
      pause: !this.state.pause,
      interval: interval
    })
  }

  pauseToggle () {
    this.setState({
      pause: !this.state.pause,
    })
    clearInterval(this.state.interval)
  }

  resumeToggle () {
    let interval = setInterval(this.secondCounter, 10)
    this.setState({
      pause: !this.state.pause,
      interval: interval,
    })
  }

  resetToggle () {
    this.setState({
      start: !this.state.start,
      hour: 0,
      interval: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
      lap: []
    })
    clearInterval(this.state.interval)
  }

  secondCounter () {
    this.setState({
      // hour: Math.floor(this.state.second / 3600),
      // minute: Math.floor((this.state.second - 1) / 60),
      second: Math.floor(this.state.millisecond / 100),
      millisecond: this.state.millisecond + 1
    })
  }

  addToLap () {
    this.setState({
      lap: this.state.lap.concat([`${(Math.floor(this.state.millisecond / 1000) % 10)}${(Math.floor(this.state.millisecond / 100) % 10)} : ${Math.floor(this.state.millisecond / 10) % 10}${this.state.millisecond % 10}`])
    })
  }

  render () {
    let laps = (this.state.lap).map( time => {
      return <div>{time}</div>
    })

    if (!this.state.start) {
      return (
        <div>
          <h1>Stop Watch</h1>
          {Math.floor(((this.state.second) % 60) / 10)}{(this.state.second) % 10} : {Math.floor(this.state.millisecond / 10) % 10}{this.state.millisecond % 10}
          <div onClick={this.startToggle}>Start</div>
        </div>
      )
    } if (!this.state.pause) {
      return (
        <div>
          <h1>Stop Watch</h1>
          {Math.floor(((this.state.second) % 60) / 10)}{(this.state.second) % 10} : {Math.floor(this.state.millisecond / 10) % 10}{this.state.millisecond % 10}
          <div onClick={this.resumeToggle}>Resume</div>
          <div onClick={this.resetToggle}>Reset</div>
          <div>{laps}</div>
        </div>
      )
    } else {
      return (
        <div>
          <h1>Stop Watch</h1>
          {Math.floor(((this.state.second) % 60) / 10)}{(this.state.second) % 10} : {Math.floor(this.state.millisecond / 10) % 10}{this.state.millisecond % 10}
          <div onClick={this.pauseToggle}>Pause</div>
          <div onClick={this.addToLap}>Lap</div>
          <div>{laps}</div>
        </div>
      )
    }

  }
}

export default StopWatch
