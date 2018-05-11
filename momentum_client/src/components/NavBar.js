import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/NavBar.css'

function NavBar () {
  return (
    <div className="navbar-container">
      <div className="navbar-wrapper">
        <Link to="alarm" className='navbar-link'><div className="navbar-category">ALARM</div></Link>
        <Link to="weather" className='navbar-link'><div className="navbar-category">WEATHER</div></Link>
        <Link to="worldclock" className='navbar-link'><div className="navbar-category">WORLD CLOCK</div></Link>
        <Link to="pomodoro" className='navbar-link'><div className="navbar-category">POMODORO</div></Link>
        <Link to="stopwatch" className='navbar-link'><div className="navbar-category">STOP WATCH</div></Link>
      </div>
    </div>
  )
}

export default NavBar
