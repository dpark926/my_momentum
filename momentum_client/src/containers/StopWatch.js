import React, {Component} from 'react'
import '../styles/StopWatch.css'

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
  }

  startToggle = () => {
    let interval = setInterval(this.secondCounter, 10)
    this.setState({
      start: !this.state.start,
      pause: !this.state.pause,
      interval: interval
    })
  }

  pauseToggle = () => {
    this.setState({
      pause: !this.state.pause,
    })
    clearInterval(this.state.interval)
  }

  resumeToggle = () => {
    let interval = setInterval(this.secondCounter, 10)
    this.setState({
      pause: !this.state.pause,
      interval: interval,
    })
  }

  resetToggle = () => {
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

  secondCounter = () => {
    this.setState({
      // hour: Math.floor(this.state.second / 3600),
      minute: Math.floor((this.state.second) / 60),
      second: Math.floor(this.state.millisecond / 100),
      millisecond: this.state.millisecond + 1
    })
  }

  addToLap = () => {
    this.setState({
      lap: this.state.lap.concat([`${Math.floor(((this.state.minute) % 60) / 10)}${(this.state.minute) % 10} : ${Math.floor(((this.state.second) % 60) / 10)}${(this.state.second) % 10} : ${Math.floor(this.state.millisecond / 10) % 10}${this.state.millisecond % 10}`])
    })
  }

  render = () => {
    let laps = (this.state.lap).map( time => {
      return <div className='each-time'>{time}</div>
    })

    if (!this.state.start) {
      return (
        <div className="stopwatch-app">
          <h1>Stop Watch</h1>
          <div className='time'>
            {/* {Math.floor(((this.state.second) % 60) / 10)}{(this.state.second) % 10} : {Math.floor(this.state.millisecond / 10) % 10}{this.state.millisecond % 10} */}
            <div className='minute'>
              00 :
            </div>
            <div className='second'>
              00 :
            </div>
            <div className='millisecond'>
              00
            </div>
          </div>
          <div className='button' onClick={this.startToggle}>START</div>
        </div>
      )
    } if (!this.state.pause) {
      return (
        <div className="stopwatch-app">
          <h1>Stop Watch</h1>
          <div className='time'>
            <div className='timeSection'>
              {Math.floor(((this.state.minute) % 60) / 10)}{(this.state.minute) % 10} :
            </div>
            <div className='timeSection'>
              {Math.floor(((this.state.second) % 60) / 10)}{(this.state.second) % 10} :
            </div>
            <div className='timeSection'>
              {Math.floor(this.state.millisecond / 10) % 10}{this.state.millisecond % 10}
            </div>
          </div>
          <div className='button-wrapper'>
            <div className='button' onClick={this.resumeToggle}>RESUME</div>
            <div className='button' onClick={this.resetToggle}>RESET</div>
          </div>
          <div className='laps'>{laps}</div>
        </div>
      )
    } else {
      return (
        <div className="stopwatch-app">
          <h1>Stop Watch</h1>
          <div className='time'>
            <div className='timeSection'>
              {Math.floor(((this.state.minute) % 60) / 10)}{(this.state.minute) % 10} :
            </div>
            <div className='timeSection'>
              {Math.floor(((this.state.second) % 60) / 10)}{(this.state.second) % 10} :
            </div>
            <div className='timeSection'>
              {Math.floor(this.state.millisecond / 10) % 10}{this.state.millisecond % 10}
            </div>
          </div>
          <div className='button-wrapper'>
            <div className='button' onClick={this.pauseToggle}>PAUSE</div>
            <div className='button' onClick={this.addToLap}>LAP</div>
          </div>
          <div className='laps'>{laps}</div>
        </div>
      )
    }

  }
}

export default StopWatch
