import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Home = () => {
	const [weather, setWeather] = useState(null);
    const { store, actions } = useContext(Context);
	useEffect(() => {
		let isMounted = true;
        const fetchWeather = async () => {
            const lat = '51.5074';
            const lon = '-0.1278';
           
            const url = process.env.BACKEND_URL + "/api/weather/"+lat+"/"+lon
			
            
                const response = await fetch(url);
                const data = await response.json();
                setWeather(data);
       
        };

        fetchWeather();
    }, []);


    return (
        <div className="container py-5 my-5 bg-light border rounded-3">
            <h1 className="display-4">Hello, world!</h1>
            {weather ? (
                <>
                   <p className="lead">Current weather in {weather.name}: {weather.weather && weather.weather.length > 0 ? weather.weather[0].main : 'N/A'}</p>
<p>Description: {weather.weather && weather.weather.length > 0 ? weather.weather[0].description : 'N/A'}</p>
                    <p>Temperature: {weather.main.temp}°C</p>
                    <hr className="my-4" />
                </>
            ) : (
                <p>Loading weather information...</p>
            )}

            <div className="text-center mt-5">
                <div className="row">
                    <button type="button" className="btn btn-danger">Schedule your flight! HERE!</button>
                </div>
                <div className="row mt-3">
                    <button type="button" className="btn btn-primary">Edit your flight! HERE!</button>
                </div>
            </div>
        </div>
    );
};

export default Home;
