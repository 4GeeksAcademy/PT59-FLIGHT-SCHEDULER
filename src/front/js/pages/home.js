import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

// Cities object with coordinates for Miami and Atlanta
const cities = {
  Miami: { lat: 25.7617, lon: -80.1918 },
  Atlanta: { lat: 33.7488, lon: -84.3877 },
  Boise: { lat: 43.615, lon: -116.2023 },
  Detroit: { lat: 42.3314, lon: -83.0458 },
  Sheppard: { lat: 33.97, lon: -98.51 },
  Laughlin: { lat: 29.3566, lon: -100.7831 },
};

export const Home = () => {
  const [selectedCity, setSelectedCity] = useState("");
  const [forecastURL, setForecastURL] = useState();
  const [weather, setWeather] = useState();
  const { store, actions } = useContext(Context);

  useEffect(() => {
    if (!selectedCity) return;

    const coordinates = cities[selectedCity];
    const fetchWeatherData = async () => {
      const url = `https://api.weather.gov/points/${coordinates.lat},${coordinates.lon}`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data); // Log the data to see what's returned
        setForecastURL(data.properties.forecast);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeatherData();
  }, [selectedCity]);

  useEffect(() => {
    if (!forecastURL) return;

    const fetchWeather = async () => {
      try {
        const response = await fetch(forecastURL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data); // Log the weather data to see what's returned
        setWeather(data.properties.periods[0]);
      } catch (error) {
        console.error("Error fetching weather:", error);
      }
    };

    fetchWeather();
  }, [forecastURL]);

  return (
    <div className="container py-5 my-5 bg-light border rounded-3">
      <h1 className="display-4">Weather App</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="mb-3">
          <label htmlFor="citySelect" className="form-label">
            Select a City
          </label>
          <select
            id="citySelect"
            className="form-control"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
          >
            <option value="">Select a City</option>
            {Object.keys(cities).map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
        <button
          type="button"
          onClick={() => setSelectedCity("")}
          className="btn btn-primary btn-animated"
        >
          Get Weather
        </button>
      </form>
      {weather ? (
        <>
          <p className="lead">
            Current weather in {weather.name}:{" "}
            {weather.detailedForecast ? weather.detailedForecast : "N/A"}
          </p>
          {/* <p>Temperature: {weather.temperature}°F</p> */}
          <hr className="my-4" />
        </>
      ) : (
        <p>Loading weather information...</p>
      )}
      <div className="text-center mt-5">
        <div className="row">
          <button type="button" className="btn btn-danger btn-animated1">
            Schedule your flight! HERE!
          </button>
        </div>
        <div className="row mt-3">
          <button type="button" className="btn btn-primary btn-animated2">
            Edit your flight! HERE!
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;


// This is me tryin to merge to the main branch