import React, { Component } from 'react';
import SetTime from '../components/SetTime.js'
import TimeDate from './TimeDate.js'
import '../styles/Alarm.css'

class Alarm extends Component {
  constructor () {
    super()

    this.state = {
      setTime: false,
      hour: 7,
      minute: 0,
      am: true,
      label: '',
      sunday: false,
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      alarmData: [],
    }
  }

  handleClick = () => {
    this.setState({
      setTime: !this.state.setTime,
    })
  }

  componentWillMount = () => {
    const URL = 'http://localhost:3000/api/v1/alarms'

    fetch(URL)
    .then(response => response.json())
    .then(data => this.setState({
      alarmData: data
    }))
    // console.log(this.state.alarmData)
  }

  handleTime = (event) => {
    let name = event.target.name
    this.setState({
      [name]: event.target.value
    })
  }

  handleAM = (event) => {
    (event.target.value === "PM") ? this.setState({am: false}) : this.setState({am: true})
  }

  handleLabel = (event) => {
    this.setState({
      label: event.target.value
    })
  }

  handleDay = (event) => {
    let name = event.target.name
    this.setState({
      [name]: event.target.checked
    })
  }

  addToAlarm = (event) => {
    event.preventDefault()
    fetch('http://localhost:3000/api/v1/alarms', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        time: `${this.state.hour}:${this.state.minute}`,
        label: this.state.label,
        am: this.state.am,
        sunday: this.state.sunday,
        monday: this.state.monday,
        tuesday: this.state.tuesday,
        wednesday: this.state.wednesday,
        thursday: this.state.thursday,
        friday: this.state.friday,
        saturday: this.state.saturday,
      })
    })
    .then( res => res.json() )
    .then( data => this.setState({
      alarmData: data,
      // hour: 7,
      // minute: 0,
      // am: true,
      // label: '',
      // sunday: false,
      // monday: false,
      // tuesday: false,
      // wednesday: false,
      // thursday: false,
      // friday: false,
      // saturday: false,
    }))
  }

  // showAlarmData = () => {
  //   console.log(this.state.alarmData)
  // }

  deleteAlarm = () => {

  }

  render = () => {
    let alarms = (this.state.alarmData).map( alarm => {
      let splitTime = alarm.time.split(":")
      let hour = splitTime[0];
      let minute = splitTime[1];
      let newHour = ''
      let newMinute = ''

      if (hour < 10) {
        newHour = "0" + hour
      } else {
        newHour = hour
      }

      if (minute < 10) {
        newMinute = "0" + minute
      } else {
        newMinute = minute
      }

      return (
        <div className="alarm-box">
          <div className="alarm-label">{alarm.label}</div>
          <div className="alarm-time">{newHour}:{newMinute}<span className="am">{alarm.am ? "AM" : "PM"}</span></div>
          {}<div className="on-off-toggle">On/Off</div>
          <div className="change-alarm-button">Change</div>
          <div className="delete-alarm-button">Delete</div>
        </div>
      )
    })

    if (!this.state.setTime) {
      return (
        <div>
          <h1>Alarm</h1>
          <TimeDate/>
          {alarms}
          <a href="#" onClick={this.handleClick}><div className="alarm-box" >+ Add Alarm</div></a>
          {/* <div onClick={this.showAlarmData}>Show Alarm Data</div> */}
        </div>
      )
    } else {
      return (
        <div>
          <h1>Alarm</h1>
          <TimeDate/>
          <SetTime
            addToAlarm={this.addToAlarm}
            handleTime={this.handleTime}
            handleAM={this.handleAM}
            handleLabel={this.handleLabel}
            handleDay={this.handleDay}
          />
          {/* <div>Hour: {this.state.hour}</div>
          <div>Minute: {this.state.minute}</div>
          <div>AM/PM: {this.state.am}</div>
          <div>Label: {this.state.label}</div>
          <div>Sunday: {this.state.sunday}</div>
          <div>Mondy: {this.state.monday}</div>
          <div>Tuesday: {this.state.tuesday}</div>
          <div>Wednesday: {this.state.wednesday}</div>
          <div>Thursday: {this.state.thursday}</div>
          <div>Friday: {this.state.friday}</div>
          <div>Saturday: {this.state.saturday}</div> */}
        </div>
      )
    }
  }
}

export default Alarm
