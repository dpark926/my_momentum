import React, { Component } from 'react';
import SetTime from '../components/SetTime.js'
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
      alarmData: this.state.alarmData.concat([data]),
      setTime: !this.state.setTime,
    }))
  }

  deleteAlarm = (id) => {
    return fetch(`http://localhost:3000/api/v1/alarms/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        // 'Authorization': localStorage.getItem('token')
      },
    })
    .then( res => res.json() )
    // .then(
    //   fetch('http://localhost:3000/api/v1/alarms')
    //   .then(response => response.json())
    //   .then(data => this.setState({
    //     alarmData: data
    //   }))
    //
    // )

    // .then( data => this.setState({
    //   setTime: !this.state.setTime,
    // }))
  }

  render = () => {
    let alarms = (this.state.alarmData).map( alarm => {
      let splitTime = alarm.time.split(":")
      let hour = splitTime[0];
      let minute = splitTime[1];
      let id = alarm.id
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
          <div className="alarm-time-day-wrapper">
            <div className="alarm-time">{newHour}:{newMinute}<span className="am">{alarm.am ? "AM" : "PM"}</span></div>
            <div className="active-day-wrapper">
              {alarm.sunday ? <div className="active-day">S</div> : <div className="inactive-day">S</div>}
              {alarm.monday ? <div className="active-day">M</div> : <div className="inactive-day">M</div>}
              {alarm.tuesday ? <div className="active-day">T</div> : <div className="inactive-day">T</div>}
              {alarm.wednesday ? <div className="active-day">W</div> : <div className="inactive-day">W</div>}
              {alarm.thursday ? <div className="active-day">T</div> : <div className="inactive-day">T</div>}
              {alarm.friday ? <div className="active-day">F</div> : <div className="inactive-day">F</div>}
              {alarm.saturday ? <div className="active-day">S</div> : <div className="inactive-day">S</div>}
            </div>
          </div>
          <div className="on-off-toggle">On/Off</div>
          <div className="change-alarm-button">Change</div>
          <div onClick={() => this.deleteAlarm(id)} className="delete-alarm-button">Delete</div>
        </div>
      )
    })

    if (!this.state.setTime) {
      return (
        <div>
          <h1>Alarm</h1>
          {alarms}
          <a href="#" onClick={this.handleClick}><div className="alarm-box" >+ Add Alarm</div></a>
        </div>
      )
    } else {
      return (
        <div>
          <h1>Alarm</h1>
          <SetTime
            addToAlarm={this.addToAlarm}
            handleTime={this.handleTime}
            handleAM={this.handleAM}
            handleLabel={this.handleLabel}
            handleDay={this.handleDay}
          />
        </div>
      )
    }
  }
}

export default Alarm
