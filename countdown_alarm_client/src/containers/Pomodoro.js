import React, {Component} from 'react'

class Pomodoro extends Component {
  constructor () {
    super()

    this.state = {
      hour: 0,
      minute: 0,
    }
  }

  render () {
    return (
      <div>
        <h1>Pomodoro</h1>
        <div>{this.state.hour} : {this.state.minute}</div>
      </div>
    )
  }
}

export default Pomodoro
