import React from 'react';
import './Today.css';

export default function Today({ currentCity, parseDT }) {
  return (
    <div className='flex-container'>
      <div className='today-container'>
        <h4>Today's Weather</h4>
        <div>
          <h2>{currentCity.name}</h2>
          <p className='date'>
            {parseDT(currentCity.dt).day}{' '}
            {parseDT(currentCity.dt).time}
          </p>
        </div>

        <div className='weather'>
          <div className='temperature'>
            <h1>{Math.round(currentCity.main.temp)}</h1>
            <span className='fahrenheit'>°F</span>
          </div>
          <div className='weather-image'>
            <img
              src={`http://openweathermap.org/img/wn/${currentCity.weather[0].icon}@2x.png`}
              alt='weather icon'
            />
            <p className='weather-description'>
              {currentCity.weather[0].description.replace(
                currentCity.weather[0].description[0],
                currentCity.weather[0].description[0].toUpperCase()
              )}
            </p>
          </div>
        </div>
      </div>
      <div className='weather-stats'>
        <h4>Extra Stats</h4>
        <p>
          High: {Math.round(currentCity.main.temp_max)}
          <span className='fahrenheit'>°F</span>
        </p>
        <p>
          Low: {Math.round(currentCity.main.temp_min)}
          <span className='fahrenheit'>°F</span>
        </p>
        <p>
          Feels like: {Math.round(currentCity.main.feels_like)}
          <span className='fahrenheit'>°F</span>
        </p>
        <p>Humidity: {currentCity.main.humidity}%</p>
        <p>Wind: {currentCity.wind.speed} Mph</p>
      </div>
    </div>
  );
}
