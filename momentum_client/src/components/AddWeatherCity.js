import React from 'react'

function AddWeatherCity (props) {
  return (
    <div>
      <form onSubmit={props.addToWeather} id="weather-form">
        <input type="text" onChange={props.handleInput} placeholder="Add City"></input>
        {props.input.length === 5 && (Number.isInteger(parseInt(props.input))) ? <input type="submit" value="+"></input> : null}
      </form>
    </div>
  )
}

export default AddWeatherCity
