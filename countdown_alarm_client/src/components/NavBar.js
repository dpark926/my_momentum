import React from 'react'
import { Link } from 'react-router-dom'

function NavBar () {
  return (
    <div>
      <Link to="alarm" className='navbar-category'>Alarm</Link>
      <Link to="weather" className='navbar-category'>Weather</Link>
      <Link to="worldclock" className='navbar-category'>World Clock</Link>
      <Link to="pomodoro" className='navbar-category'>Pomodoro</Link>
      <Link to="stopwatch" className='navbar-category'>Stop Watch</Link>
    </div>
  )
}

export default NavBar
