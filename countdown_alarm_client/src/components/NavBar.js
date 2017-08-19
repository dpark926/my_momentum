import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/NavBar.css'

function NavBar () {
  return (
    <div className="navbar">
      <div className="navbar-wrapper">
        <Link to="alarm" className='navbar-link'><div className="navbar-category">Alarm</div></Link>
        <Link to="weather" className='navbar-link'><div className="navbar-category">Weather</div></Link>
        <Link to="worldclock" className='navbar-link'><div className="navbar-category">World Clock</div></Link>
        <Link to="pomodoro" className='navbar-link'><div className="navbar-category">Pomodoro</div></Link>
        <Link to="stopwatch" className='navbar-link'><div className="navbar-category">Stop Watch</div></Link>
      </div>
    </div>
  )
}

export default NavBar
