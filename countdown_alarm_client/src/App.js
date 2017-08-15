import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import Weather from './components/Weather.js'
import Alarm from './components/Alarm.js'
import WorldClock from './components/WorldClock.js'

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
        <Route path="/weather" component={Weather}/>
        <Route path="/alarm" component={Alarm}/>
        <Route path="/worldClock" component={WorldClock}/>
      </div>
    );
  }
}

export default App;
