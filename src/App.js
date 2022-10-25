import React, { useEffect } from 'react';
import Today from './components/Today/Today';
import Daily from './components/Daily/Daily';
import './App.css';

function App() {
  const [searchText, setSearchText] = React.useState('');
  const [currentCity, setCurrentCity] = React.useState({});
  const [currentCityForecast, setCurrentCityForecast] =
    React.useState([]);
  const API_KEY = 'adfefe6b1f8eeadd68dee1933526bd47';

  useEffect(() => fetchWeather('Philadelphia'), []);

  function parseDT(dt) {
    const date = new Date(dt * 1000).toString().split(' ');
    const separatedDate = {
      day: date[0],
      month: date[1],
      date: date[2],
      year: date[3],
      time: date[4],
    };
    return separatedDate;
  }

  async function fetchWeather(cityName) {
    const responseForToday = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=imperial`
    );
    const todayJson = await responseForToday.json();
    const responseForecast = await fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${todayJson.coord.lat}&lon=${todayJson.coord.lon}&appid=${API_KEY}&units=imperial`
    );
    const forecastJson = await responseForecast.json();
    setCurrentCity(todayJson);
    setCurrentCityForecast(forecastJson.daily);
  }

  function convertToC(temp) {
    return Math.round((temp - 32) * (5 / 9));
  }
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      console.log(searchText);
      fetchWeather(searchText);
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchText]);

  return (
    <main>
      <form>
        <input
          type='text'
          placeholder='Enter a City...'
          onChange={(e) => setSearchText(e.target.value)}
        />
      </form>
      {/* Today */}
      {Object.keys(currentCity).length && (
        <Today currentCity={currentCity} parseDT={parseDT} />
      )}
      {/* //daily spread */}
      <div className='daily-container'>
        {Object.keys(currentCityForecast).length &&
          currentCityForecast.slice(0, 5).map((element) => {
            return (
              <Daily
                selected={element === currentCityForecast[0]}
                currentDay={element}
                parseDT={parseDT}
              />
            );
          })}
      </div>
    </main>
  );
}

export default App;
