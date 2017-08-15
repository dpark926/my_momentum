import React from 'react'

function SetTime () {
  let hour = []
  let minute = []

  for (var i = 1; i <= 12; i++) {
    if (i < 10) {
      hour.push(<option value={i} id={`min${i}`}>{`0${i}`}</option>)
    } else {
      hour.push(<option value={i} id={`min${i}`}>{i}</option>)
    }
  }

  for (var j = 1; j < 60; j++) {
    if (j < 10 && j % 5 === 0) {
      minute.push(<option value={j} id={`hour${j}`}>{`0${j}`}</option>)
    } else if (j % 5 === 0) {
      minute.push(<option value={j} id={`hour${j}`}>{j}</option>)
    }
  }

  return (
    <div>
      <h1>Alarm</h1>
      <div>+ Add Alarm</div>
      <select>
        {hour}
      </select>
      <select>
        <option value="0" id="min0">00</option>
        {minute}
      </select>
      <select>
        <option value="AM" id="AM">AM</option>
        <option value="PM" id="PM">PM</option>
      </select>
      <input type="submit"></input>
    </div>
  )
}

export default SetTime
