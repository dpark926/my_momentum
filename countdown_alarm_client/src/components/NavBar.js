import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/NavBar.css'

function NavBar () {
  return (
    <div className="navbar">
      <div className="navbar-wrapper">
        <Link to="alarm" className='navbar-link'><div className="navbar-category">ALARM</div></Link>
        <Link to="weather" className='navbar-link'><div className="navbar-category">WEATHER</div></Link>
        <Link to="worldclock" className='navbar-link'><div className="navbar-category">WORLD CLOCK</div></Link>
        <Link to="pomodoro" className='navbar-link'><div className="navbar-category">POMODORO</div></Link>
        <Link to="stopwatch" className='navbar-link'><div className="navbar-category">STOP WATCH</div></Link>
      </div>
      {/* <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">Navbar</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link to="alarm" className='navbar-link'><div className="navbar-category">Alarm</div></Link>
            </li>
            <li className="nav-item">
              <Link to="weather" className='navbar-link'><div className="navbar-category">Weather</div></Link>
            </li>
            <li className="nav-item">
              <Link to="worldclock" className='navbar-link'><div className="navbar-category">World Clock</div></Link>
            </li>
            <li className="nav-item">
              <Link to="pomodoro" className='navbar-link'><div className="navbar-category">Pomodoro</div></Link>
            </li>
            <li className="nav-item">
              <Link to="stopwatch" className='navbar-link'><div className="navbar-category">Stop Watch</div></Link>
            </li>
          </ul>
        </div>
      </nav> */}
    </div>
  )
}

export default NavBar
