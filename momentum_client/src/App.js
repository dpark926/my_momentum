import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import NavBar from './components/NavBar.js';
import TimeDate from './containers/TimeDate.js';
import Weather from './containers/Weather.js';
import Alarm from './containers/Alarm.js';
import WorldClock from './containers/WorldClock.js';
import Pomodoro from './containers/Pomodoro.js';
import StopWatch from './containers/StopWatch.js';

import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <div className="App">
          <NavBar/>
          <Redirect to='/'/>
          <Route exact path="/" component={TimeDate}/>
          <Route path="/weather" component={Weather}/>
          <Route path="/alarm" component={Alarm}/>
          <Route path="/worldclock" component={WorldClock}/>
          <Route path="/pomodoro" component={Pomodoro}/>
          <Route path="/stopwatch" component={StopWatch}/>
        </div>
      </Provider>
    );
  }
}

export default App;
