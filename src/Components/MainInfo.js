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
    error,
    firstCity,
    secondCity,
    thirdCity,
    forthCity,
    fifthCity,
    getWeatherForSingleCity,
}) {
    var container; // the container of the MainInfo
     switch (isMultipleCities) {
        case 1:
            container = 
                    <div className="main-info-container">
                        {(firstCity) ? ( <div className="item location" lon={firstCity.lon} lat={firstCity.lat} onClick={getWeatherForSingleCity}>
                                            <span className="static-span">City:</span>
                                            <span className="dynamic-span" id="multipleCityName">{firstCity.name}</span>
                                            <span className="static-span">Country:</span>
                                            <span className="dynamic-span" id="multipleCityCountry">{firstCity.country}</span>
                                        </div>) : false}
                        {(secondCity) ? (<div className="item location" lon={secondCity.lon} lat={secondCity.lat} onClick={getWeatherForSingleCity}>
                                            <span className="static-span">City:</span>
                                            <span className="dynamic-span" id="multipleCityName">{secondCity.name}</span>
                                            <span className="static-span">Country:</span>
                                            <span className="dynamic-span" id="multipleCityCountry">{secondCity.country}</span>
                                        </div>) : false}
                        {(thirdCity) ? (<div className="item location" lon={thirdCity.lon} lat={thirdCity.lat} onClick={getWeatherForSingleCity}>
                                            <span className="static-span">City:</span>
                                            <span className="dynamic-span" id="multipleCityName">{thirdCity.name}</span>
                                            <span className="static-span">Country:</span>
                                            <span className="dynamic-span" id="multipleCityCountry">{thirdCity.country}</span>
                                        </div>) : false}
                        {(forthCity) ? (<div className="item location" lon={forthCity.lon} lat={forthCity.lat} onClick={getWeatherForSingleCity}>
                                            <span className="static-span">City:</span>
                                            <span className="dynamic-span" id="multipleCityName">{forthCity.name}</span>
                                            <span className="static-span">Country:</span>
                                            <span className="dynamic-span" id="multipleCityCountry">{forthCity.country}</span>
                                        </div>) : false}
                        {(fifthCity) ? (<div className="item location" lon={fifthCity.lon} lat={fifthCity.lat} onClick={getWeatherForSingleCity}>
                                            <span className="static-span">City:</span>
                                            <span className="dynamic-span" id="multipleCityName">{fifthCity.name}</span>
                                            <span className="static-span">Country:</span>
                                            <span className="dynamic-span" id="multipleCityCountry">{fifthCity.country}</span>
                                        </div>) : false}
                    </div>
    break;
        case 0:
            container = 
                    <div className="main-info-container">
                        <div className="item location"><span className="static-span">Location: </span>{city}, {country}</div>
                        <div className="item temp"><span className="static-span">Temperature: </span>{temp} &deg;</div>
                        <div className="item weather"><span className="static-span">Weather: </span>{weather}</div>
                        <div className="item humidity"><span className="static-span">Humidity: </span>{humidity}%</div>
                    </div>
    break;
        default:
            container = 
                    <div className="error-container">
                        <div className="error-message" text-transform="capitalize">
                            {error}
                        </div>
                    </div>
    } 

    return (

        <div className="info-container">
            <SearchForm
                setQuery={setQuery}
                getWeather={getWeather}
                query={query}
            />
            {container}
        </div>
    );
}

export default MainInfo;