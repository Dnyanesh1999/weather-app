import React, { useState } from "react";
import "./weather.css";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = () => {
    if (!city) return;

    setLoading(true);
    setWeatherData(null);
    setError(null);

    fetch(
      `https://api.weatherapi.com/v1/current.json?key=f88913faf97f4e5ab3b122102240405&q=${city}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
        }
        return response.json();
      })
      .then((data) => {
        setWeatherData(data);
        setLoading(false); // Stop loading after data is fetched
      })
      .catch((error) => {
        setLoading(false); // Stop loading if there's an error
        setError(error.message);
        alert("Failed to fetch weather data");
      });
  };

  return (
    <div style={{ padding: "20px" }}>
      <div>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {loading && <p>Loading data…</p>}

      {weatherData && (
        <div className="weather-cards">
          <div className="weather-card">
            <h4>Temperature</h4>
            <p>{weatherData.current.temp_c}°C</p>
          </div>
          <div className="weather-card">
            <h4>Humidity</h4>
            <p>{weatherData.current.humidity}%</p>
          </div>
          <div className="weather-card">
            <h4>Condition</h4>
            <p>{weatherData.current.condition.text}</p>
          </div>
          <div className="weather-card">
            <h4>Wind Speed</h4>
            <p>{weatherData.current.wind_kph} kph</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
