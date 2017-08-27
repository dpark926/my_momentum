import React, { Component } from 'react';
import SetTime from '../components/SetTime.js'

class Alarm extends Component {
  constructor () {
    super()

    this.state = {
      setTime: false,
      hour: 0,
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
    .then(jsonResponse => this.setState({
      alarmData: jsonResponse
    }))
  }

  handleHour = (event) => {
    this.setState({
      hour: event.target.value
    })
  }

  handleMinute = (event) => {
    this.setState({
      minute: event.target.value
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

  addToAlarm(event){
    event.preventDefault()
    // debugger
    // fetch('http://localhost:3000/api/v1/alarms', {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     time: 'yourValue',
    //     label: 'yourOtherValue',
    //     :time, :label, :am?, :sunday, :monday, :tuesday, :wednesday, :thursday, :friday, :saturday
    //   })
    // })
  }

  // addToPlanner(){
  //   window.location.reload()
  //   // debugger
  //   axios.post('http://localhost:3000/api/v1/planner_dates', {
  //     planner_date: {
  //       date: this.state.selectedDate,
  //       user_id: localStorage.user_id,
  //       recipe_id: this.state.clickedId,
  //       recipe_name: this.state.clickedRecipe,
  //       meal_type: this.state.selectedMealTime
  //     }
  //   }).then(res => {
  //     console.log(res.planner)
  //     localStorage.setItem("planner", res.data)
  //   }).then( () => this.props.history.push('/recipes'))
  //     .catch((error) => console.log(error.response) )
  //
  //   // fetch('http://localhost:3000/api/v1/planner_dates')
  //   // .then(response => response.json())
  //   // .then(jsonResponse => this.setState({
  //   //   plannerData: jsonResponse.planner_dates
  //   // }))
  // }
  //
  // deletePlannerDate(id){
  //   window.location.reload()
  //   return fetch(`http://localhost:3000/api/v1/planner_dates/${id}`, {
  //     method: 'DELETE',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json',
  //       'Authorization': localStorage.getItem('token')
  //     },
  //   }).then( res => res.json() )
  //
  //   // fetch(`http://localhost:3000/api/v1/planner_dates/${id}`)
  //   // .then(response => response.json())
  //   // .then(jsonResponse => this.setState({
  //   //   plannerData: jsonResponse.planner_dates
  //   // }))
  // }

  render = () => {
    if (!this.state.setTime) {
      return (
        <div>
          <h1>Alarm</h1>
          <a href="#" onClick={this.handleClick}>+ Add Alarm</a>
        </div>
      )
    } else {
      return (
        <div>
          <h1>Alarm</h1>
          <SetTime
            addToAlarm={this.addToAlarm}
            handleHour={this.handleHour}
            handleMinute={this.handleMinute}
            handleAM={this.handleAM}
            handleLabel={this.handleLabel}
            handleDay={this.handleDay}
          />
          <div>Hour: {this.state.hour}</div>
          <div>Minute: {this.state.minute}</div>
          <div>AM/PM: {this.state.am}</div>
          <div>Label: {this.state.label}</div>
          <div>Sunday: {this.state.sunday}</div>
          <div>Mondy: {this.state.monday}</div>
          <div>Tuesday: {this.state.tuesday}</div>
          <div>Wednesday: {this.state.wednesday}</div>
          <div>Thursday: {this.state.thursday}</div>
          <div>Friday: {this.state.friday}</div>
          <div>Saturday: {this.state.saturday}</div>
        </div>
      )
    }
  }
}

export default Alarm
