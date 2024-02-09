import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WeatherDisplay = ({ lat, lng }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const response = await axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lng}&exclude=minutely,alerts&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`);
      setWeatherData(response.data);
    };

    fetchWeather();
  }, [lat, lng]);

  return (
    <div>
      {weatherData && (
        <div className="text-sm">
          <p>Sky Condition: {weatherData.current.weather[0].main}</p>
          <p>Temperature: {((weatherData.current.temp - 273.15) * 9/5 + 32).toFixed(2)}°F</p>
          <p>Humidity: {weatherData.current.humidity}%</p>
          <p>Wind Speed: {weatherData.current.wind_speed}mph</p>
        </div>
      )}
    </div>
  );
};

export default WeatherDisplay;
