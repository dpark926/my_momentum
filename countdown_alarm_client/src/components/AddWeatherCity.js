import React from 'react'

function AddWeatherCity (props) {
  return (
    <div>
      <form onSubmit={props.addToWeather}>
        <input type="text" onChange={props.handleInput} placeholder="Add City"></input>
        <input type="submit" value="+"></input>
        {/* <p>Hello weather</p> */}
      </form>
    </div>
  )
}

export default AddWeatherCity
