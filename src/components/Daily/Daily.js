import React from 'react';
import './Daily.css';

export default function Daily({ parseDT, currentDay, selected }) {
  return (
    <div className={'day-container ' + (selected ? 'selected' : '')}>
      <p>{parseDT(currentDay?.dt).day}</p>
      <img
        src={`http://openweathermap.org/img/wn/${currentDay.weather[0].icon}@4x.png`}
        alt='weather icon'
        width='64px'
      />
      <p>
        {Math.round(currentDay?.temp.max)}
        <span className='fahrenheit'>°F</span> |{' '}
        {Math.round(currentDay?.temp.min)}
        <span className='fahrenheit'>°F</span>
      </p>
    </div>
  );
}
