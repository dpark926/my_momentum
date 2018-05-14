import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom'
import AddWeatherCity from '../components/AddWeatherCity.js';
import WeatherPost from './WeatherPost';
import '../styles/Weather.css';

class Weather extends Component {
  constructor () {
    super();

    this.state = {
      addCityToggleButton: false,
      input: '',
      zipCodeData: [],
      error: '',
    }
  }

  /**
   * GET request to the local server that returns a list of all zip codes (string).
   */
  componentWillMount = () => {
    const URL = 'http://localhost:3000/api/v1/weathers'

    fetch(URL)
    .then(response => response.json())
    .then(data => this.setState({
      zipCodeData: data
    }))
    .catch(err => console.log(err))
    .then(() => console.log('zipCodeData success'))
  }

  /**
   * An event handler that makes a POST request with the zip code input and
   * updated the the state by concatenating to the existing array.
   * Validates if the zip code is a five digit number that doesn't start with 0.
   */
  addToWeather = (event) => {
    event.preventDefault()

    if (/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(parseInt(this.state.input))) {
      fetch('http://localhost:3000/api/v1/weathers', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          city: this.state.input
        })
      })
      .then( res => res.json() )
      .then( data => this.setState({
        zipCodeData: this.state.zipCodeData.concat([data]),
        addCityToggleButton: !this.state.addCityToggleButton,
        input: '',
        error: '',
      }))
    } else {
      this.setState({
        error: "Please enter a valid zip code",
        input: ''
      })
      document.getElementById("weather-form").reset()
    }
  }

  /**
   * An event handler that makes a DELETE request with the zip code input and
   * updating the state.
   */
  deleteWeather = (id) => {
    let idRemoved = this.state.zipCodeData.filter(function(el) {
      return el.id !== id;
    });

    return fetch(`http://localhost:3000/api/v1/weathers/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then( res => res.json() )
    .then( data => this.setState({
      zipCodeData: idRemoved,
    }))
  }

  /**
  * An event handler that toggles the display between the 5-day weather forecast
  * or the input for the zip code.
  */
  handleClick = () => {
    this.setState({
      addCityToggleButton: !this.state.addCityToggleButton,
    })
  }

  /**
  * An event handler that handles the input of the zip code.
  */
  handleInput = (event) => {
    this.setState({
      input: event.target.value
    })
  }

  increasePage = () => {
    this.setState({
      pageNum: this.state.pageNum + 1
    })
  }

  render = () => {
    // let zipcodeList = this.state.zipCodeData.map( ( zipcode, num ) => {
    //   return (
    //     // <Route
    //     //   // path={() => `/weather/${num + 1}`}
    //     //   path='/weather/:postId'
    //     //   render={() => <WeatherPost
    //     //     zipCode={ zipcode.city }
    //     //   />}
    //     // />
    //     <WeatherPost zipCode={ zipcode.city }/>
    //   )
    // })
    /**
     * Toggling between the display of the 5-day weather forecast or the section to add a new zipcode.
     */

    // if (this.state.zipCodeData.length !== 0) {
    //   console.log(this.state.zipCodeData)
    //   return (
    //     <div>
    //       {/* <Redirect to='/weather/7'/> */}
    //       {/* <Route
    //         path='/weather'
    //         render={() => <WeatherPost
    //         zipCode='11372'
    //       />}/>
    //       <Route
    //         path='/weather/2'
    //         render={() => <WeatherPost
    //         zipCode='11358'
    //       />}/> */}
    //       {/* <Switch> */}
    //
    //         {zipcodeList}
    //       {/* </Switch> */}
    //     </div>
    //   )
    // } else {
    //   return (
    //     <div>
    //       <h1>Weather</h1>
    //       <AddWeatherCity handleInput={this.handleInput} addToWeather={this.addToWeather} input={this.state.input}/>
    //       <div>Input: {this.state.input}</div>
    //       <div>{this.state.error}</div>
    //     </div>
    //   )
    // }

    // console.log(this.state.zipCodeData)
    // let list = this.state.zipCodeData.map(weather => {
    //   console.log(weather)
    //   return (
    //     <div>
    //       <Link to={() => `/weather/${weather.city}`}>
    //       {/* <Link to='/weather/11101'> */}
    //         <WeatherPost zipCode={weather.city}/>
    //       </Link>
    //     </div>
    //   )
    // })
    //
    // if (this.state.zipCodeData.length !== 0) {
    //   console.log(this.state.pageNum)
    //   return (
    //     <div>
    //       <h1>Hello?</h1>
    //       {/* {list} */}
    //       <WeatherPost zipCode={this.state.zipCodeData[this.state.pageNum].city}/>
    //       <div>{this.state.pageNum}</div>
    //       <div onClick={this.increasePage}>Increase</div>
    //       <div>{this.state.zipCodeData[this.state.pageNum].city}</div>
    //     </div>
    //   )
    // } else {
    //   return (
    //     <div>loading</div>
    //   )
    // }

    let list = this.state.zipCodeData.map( (weather, num, arr) => {
      return (
        <Route
          path={`/weather/${weather.city}`}
          render={() => <WeatherPost
            zipCode={weather.city}
            nextZipCode={arr[num + 1] ? arr[num + 1].city : null}
          />}
        />
      )
    })

    if (this.state.zipCodeData.length !== 0) {
      return (
        <div className='weatherContainer'>
          <Redirect to={`/weather/${this.state.zipCodeData[0].city}`}/>
          {list}
        </div>
      )
    } else {
      return (
        <div className='weatherContainer'>LOADING...</div>
      )
    }
  }
}

export default Weather
