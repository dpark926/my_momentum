import React, {Component} from 'react';
import '../styles/TimeDate.css';

class TimeDate extends Component {
  constructor() {
    super()

    let d = new Date();

    this.state = {
      day: d.getDay(),
      month: d.getMonth(),
      date: d.getDate(),
      year: d.getFullYear(),
      hour: d.getHours(),
      minute: d.getMinutes(),
      name: 'Daniel',
      showInput: false,
    }
  }

  countingMinute = () => {
    let d = new Date();

    this.setState({
      day: d.getDay(),
      month: d.getMonth(),
      date: d.getDate(),
      year: d.getFullYear(),
      hour: d.getHours(),
      minute: d.getMinutes(),
    })
  }

  componentWillMount = () => {
    setInterval(this.countingMinute, 60000);
  }

  switchOffInput = (e) => {
    if (e.key === 'Enter') {
      this.setState({
        showInput: !this.state.showInput
      })
    }
  }

  switchOnInput = () => {
    this.setState({
      showInput: !this.state.showInput
    })
  }

  handleName = (e) => {
    this.setState({
      name: e.target.value
    })
  }

  render = () => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "November", "December"]
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    let greeting = 'Hello'

    if (this.state.hour < 6 || this.state.hour > 17) {
      greeting = "Good Evening"
    } else if (this.state.hour < 12 && this.state.hour >= 6) {
      greeting = "Good Morning"
    } else if (this.state.hour >= 12 && this.state.hour < 18) {
      greeting = "Good Afternoon"
    }

    let input = <input type='text' placeholder='Name' className='inputName' onChange={this.handleName} onKeyPress={this.switchOffInput}></input>
    let name = <span onClick={this.switchOnInput}>{this.state.name}</span>

    return (
      <div className='timedate-wrapper'>
        <div>
          <div className='timedate-date'>{days[this.state.day]}, {months[this.state.month]} {this.state.date}, {this.state.year}</div>
          <div className='counting-time'>
            {this.state.hour === 0 || this.state.hour === 12 ? "12" : this.state.hour % 12}:{this.state.minute < 10 ? "0" + this.state.minute : this.state.minute}
            <span className="ampm">{this.state.hour < 12 ? "AM" : "PM"}</span>
          </div>
          <div className="alarm-greeting">{greeting}, {this.state.showInput ? input : name}</div>
        </div>
      </div>
    )
  }
}

export default TimeDate
