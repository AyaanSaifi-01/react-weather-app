import "./WeatherApp.css";
import search from "./assets/search.png";
import clouds from "./assets/clouds.png";
import humidity from "./assets/humidity.png";
import wind from "./assets/wind.png";
import weatherImages from "./WeatherImages";
import { useEffect, useState } from "react";

const WeatherApp = () => {
  const api_key = "f96d11f55c9458159d22442f85e9d71a";

  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("Ajmer");

  const fetchWeather = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`
      );
      const data = await response.json();
      if (data.cod !== 200) {
        alert("City not found! Please enter a valid city.");
        return; 
      }
      setWeather(data);
      setCity("");
    } catch (error) {
      console.log("Error fetching weather:", error);
      alert("Something went wrong. Please try again!");
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <div className="container">
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              fetchWeather();
            }
          }}
        />
        <button onClick={fetchWeather}>
          <img src={search} alt="search" />
        </button>
      </div>

      {weather && (
        <>
          <div className="image-viewer">
            <img
              src={weatherImages[weather.weather[0].main] || clouds}
              alt={weather.weather[0].main}
            />
            <h1>{weather.main.temp}°C</h1>
            <h2>{weather.name}</h2>
          </div>

          <div className="details">
            <div className="col">
              <img src={humidity} alt="humidity-image" />
              <div>
                <p className="humidity">{weather.main.humidity}%</p>
                <p>Humidity</p>
              </div>
            </div>
            <div className="col">
              <img src={wind} alt="wind-image" />
              <div>
                <p className="wind">{weather.wind.speed} km/h</p>
                <p>Wind Speed</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default WeatherApp;
