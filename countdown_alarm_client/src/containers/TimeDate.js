import React, {Component} from 'react'
import '../styles/TimeDate.css';

class TimeDate extends Component {

  constructor() {
    super()

    let d = new Date()
    this.state = {
      day: d.getDay(),
      month: d.getMonth(),
      date: d.getDate(),
      year: d.getFullYear(),
      hour: d.getHours(),
      minute: d.getMinutes(),
      // second: d.getSeconds(),
      // time: d.toLocaleTimeString(),
    }
  }

  countingMinute = () => {
    let d = new Date()
    this.setState({
      day: d.getDay(),
      month: d.getMonth(),
      date: d.getDate(),
      year: d.getFullYear(),
      hour: d.getHours(),
      minute: d.getMinutes(),
      // second: d.getSeconds(),
      // milliseconds: d.getMilliseconds(),
      // time: d.toLocaleTimeString()
    })
  }

  componentWillMount = () => {
    setInterval(this.countingMinute, 60000)
  }

  render = () => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "November", "December"]
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    return (
      <div className='timedate-wrapper'>
        <div className='counting-time'>{this.state.hour % 12}:{this.state.minute < 10 ? "0" + this.state.minute : this.state.minute}<span className="am">{this.state.hour < 13 ? "AM" : "PM"}</span></div>
        <div className='timedate-date'>{days[this.state.day]}, {months[this.state.month]} {this.state.date}, {this.state.year}</div>
      </div>
    )
  }
}

export default TimeDate
