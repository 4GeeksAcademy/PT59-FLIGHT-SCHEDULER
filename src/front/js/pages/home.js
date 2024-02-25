import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Home = () => {
  const [coordinates, setCoordinates] = useState();
  const [forecastURL, setForecastURL] = useState();
  const [weather, setWeather] = useState();
  const { store, actions } = useContext(Context);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const url = "https://api.weather.gov/points/33.667961,-84.017792";
      const response = await fetch(url);
      const data = await response.json();
      setForecastURL(data);
      console.log(data, "WEATHER DATA");
    };

    fetchWeatherData();
  }, []);

  useEffect(() => {
    if (forecastURL) {
      const fetchWeather = async () => {
        const url = forecastURL.properties.forecast;
        const response = await fetch(url);
        const data = await response.json();
        setWeather(data.properties.periods[0]);
      };

      fetchWeather();
    }
  }, [forecastURL]);

  return (
    <div className="container py-5 my-5 bg-light border rounded-3">
      <h1 className="display-4">Hello, world!</h1>
      {weather ? (
        <>
          <p className="lead">
            Current weather in {weather.name}:{" "}
            {weather.weather && weather.weather.length > 0
              ? weather.weather[0].main
              : "N/A"}
          </p>
          <p>WindSpeed: {weather.windSpeed}</p>
          <p>Temperature: {weather.temperature}°C</p>
          <hr className="my-4" />
        </>
      ) : (
        <p>Loading weather information...</p>
      )}

      <div className="text-center mt-5">
        <div className="row">
          <button type="button" className="btn btn-danger">
            Schedule your flight! HERE!
          </button>
        </div>
        <div className="row mt-3">
          <button type="button" className="btn btn-primary">
            Edit your flight! HERE!
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
