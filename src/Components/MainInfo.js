import React from "react";
import '../Styles/MainInfo.css';

// Components
import SearchForm from "./SearchForm";

function MainInfo({
    isMultipleCities,
    city,
    country,
    humidity,
    weather,
    temp,
    setQuery,
    query,
    getWeather,
    error
}) {

    return (

        <div className="info-container">
            <SearchForm
                setQuery={setQuery}
                getWeather={getWeather}
                query={query}
            />
            {(isMultipleCities) ? (
                <div className="main-info-container">
                    <div className="item location"><span>Location: </span>{city}, {country}</div>
                    <div className="item temp"><span>Temperature: </span>{temp} &deg;</div>
                    <div className="item weather"><span>Weather: </span>{weather}</div>
                    <div className="item humidity"><span>Humidity: </span>{humidity}%</div>
                </div>
            ) : (
                <div className="error-container">
                    <div className="error-message" text-transform="capitalize">
                        {error}
                    </div>
                </div>
            )
            }
        </div>
    );
}

export default MainInfo;