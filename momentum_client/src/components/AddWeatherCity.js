import React from 'react';
import '../styles/AddWeatherCity.css';

function AddWeatherCity (props) {
  return (
    <div className='addWeatherCityContainer'>
      <form onSubmit={props.addToWeather} id="weather-form">
        <input type="number" onChange={props.handleInput} placeholder="Add Zipcode" className='addWeatherCityContainerInput'></input>
        {props.input.length === 5 && (Number.isInteger(parseInt(props.input))) ? <input type="submit" value="Submit" className='addWeatherSubmitButton'></input> :<input value="Submit" className='addWeatherSubmitButton-inactive'></input>}
      </form>
    </div>
  )
}

export default AddWeatherCity
