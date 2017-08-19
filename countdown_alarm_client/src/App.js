import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar.js'
import Weather from './containers/Weather.js'
import Alarm from './containers/Alarm.js'
import WorldClock from './containers/WorldClock.js'
import Pomodoro from './containers/Pomodoro.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p> */}
        <NavBar/>
        <Route path="/weather" component={Weather}/>
        <Route path="/alarm" component={Alarm}/>
        <Route path="/worldclock" component={WorldClock}/>
        <Route path="/pomodoro" component={Pomodoro}/>
      </div>
    );
  }
}

export default App;
