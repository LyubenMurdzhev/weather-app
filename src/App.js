import React, {useEffect, useState} from 'react';
import './Styles/App.css'; //Style

//Components
import Hero from "./Components/Hero";
import MainInfo from "./Components/MainInfo";



function App() {

  // weather icons
  const WeatherIconsUrl = {
    "01d": "http://openweathermap.org/img/wn/01d@2x.png",
    "01n": "http://openweathermap.org/img/wn/01n@2x.png",
    "02d": "http://openweathermap.org/img/wn/02d@2x.png",
    "02n": "http://openweathermap.org/img/wn/02n@2x.png",
    "03d": "http://openweathermap.org/img/wn/03d@2x.png",
    "03n": "http://openweathermap.org/img/wn/03n@2x.png",
    "04d": "http://openweathermap.org/img/wn/04d@2x.png",
    "04n": "http://openweathermap.org/img/wn/04n@2x.png",
    "09d": "http://openweathermap.org/img/wn/09d@2x.png",
    "09n": "http://openweathermap.org/img/wn/09n@2x.png",
    "10d": "http://openweathermap.org/img/wn/10d@2x.png",
    "10n": "http://openweathermap.org/img/wn/10n@2x.png",
    "11d": "http://openweathermap.org/img/wn/11d@2x.png",
    "11n": "http://openweathermap.org/img/wn/11n@2x.png",
    "13d": "http://openweathermap.org/img/wn/13d@2x.png",
    "13n": "http://openweathermap.org/img/wn/13n@2x.png",
    "50d": "http://openweathermap.org/img/wn/50d@2x.png",
    "50n": "http://openweathermap.org/img/wn/50n@2x.png"
  };

    // API
    const api = {
      //Do not abuse the API KEY :P
      key: "62951645c0615e879b3516cb49b80862",
      urlWeather: "https://api.openweathermap.org/data/2.5/weather",
      urlLocation: "http://api.openweathermap.org/geo/1.0/reverse",
      urlMultipleLocations: "http://api.openweathermap.org/geo/1.0/direct"
    }

  // Reg ex for validation purposes
  const regEx = /^[a-zA-Z\s]+$/;
  // Elements and global variables
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [humidity, setHumidity] =useState("");
  const [temp, setTemp] = useState("");
  const [error, setError] = useState("");
  const [urlIcon, setUrlIcon] = useState("");
  const [pathIcon, setPathIcon] = useState("");
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [backgroundClass, setBackgroundClass] = useState("default");
  const [uniqueCities] = useState([]);
  const [isMultipleCities, setIsMultipleCities] = useState(); // 0 false ; 1 true ; 3 error
  const [firstCity, setFirstCity] = useState({
    name:"",
    country:"",
  });
  const [secondCity, setSecondCity] = useState({
    name:"",
    country:"",
  });
  const [thirdCity, setThirdCity] = useState({
    name:"",
    country:"",
  });

  const [forthCity, setForthCity] = useState({
    name:"",
    country:"",
  });

  const [fifthCity, setFifthCity] = useState({
    name:"",
    country:"",
  });
  //Array to push multiple cities
  var arrOfCities = [];

  /* Initial current geolocation and weather */
 useEffect(() => {
    //Fetching current position
    const fetchCurrentCity= async () => {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      });

      //Checking if the user has enabled location on their browser
      // User has enabled location on their browser
      if(longitude && latitude) {
        const api_call_current = await fetch(`${api.urlLocation}?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&appid=${api.key}&units=metric`);
        const data_current_location = await api_call_current.json();
       
        //Setting the fetched data
        if(data_current_location[0].name) {
          const api_call_current_weather = await fetch(`${api.urlWeather}?q=${data_current_location[0].name}&units=metric&appid=${api.key}`);
          const data_current_weather = await api_call_current_weather.json();
          setQuery(data_current_location[0].name);
          setCity(data_current_weather.name);
          setCountry(data_current_weather.sys.country);
          setTemp(Math.round(data_current_weather.main.temp));
          setHumidity(data_current_weather.main.humidity)
          setWeather(data_current_weather.weather[0].description);
          setUrlIcon(WeatherIconsUrl[`${data_current_weather.weather[0].icon}`]);
          setPathIcon("i" + data_current_weather.weather[0].icon);
          setBackgroundClass(data_current_weather.weather[0].main) 
        } else {
          //User has not enabled location on their browser.
          setError("Please turn on location");
        }
    }
  }
  fetchCurrentCity();

  }, [latitude, longitude, api.key, api.urlLocation, api.urlWeather])

  /* Fetching the weather on the filled city */
const getWeather = async (e) => {
    e.preventDefault();

      //Validating that the input includes only [a-z][A-]
      if (regEx.test(query)) {

      //Check for multiple cities
      const api_call_check = await fetch(`${api.urlMultipleLocations}?q=${query},,&limit=5&units=metric&lang=en&appid=${api.key}`);
      const data_check = await api_call_check.json();

      /*Check wether there are multiple cities with the filled name */
      // There are multiple cities
      if (data_check.length > 1) { 
        setIsMultipleCities(1);

        //Pushing the cities to an array
          for (let i = 0; i < 5; i++) {
            arrOfCities[i] = {
              name: data_check[i].name,
              country: data_check[i].country,
              lon: data_check[i].lon,
              lat: data_check[i].lat
            }
        }

        // Deconstructing the cities by name
        var uniqueCities = [...new Map(arrOfCities.map((item) => [item["name","country"], item])).values()]; 

        // Reset the cities before adding the new searched one
        setFirstCity("");
        setSecondCity("");
        setThirdCity("");
        setForthCity("");
        setFifthCity("");

        //Setting each of the cities to their respective object
        if (uniqueCities.length > 0) {
          setFirstCity({
            name: uniqueCities[0].name,
            country:uniqueCities[0].country,
            lon: uniqueCities[0].lon,
            lat: uniqueCities[0].lat
        })}

        if (uniqueCities.length > 1) {
            setSecondCity({
              name: uniqueCities[1].name,
              country:uniqueCities[1].country,
              lon: uniqueCities[1].lon,
              lat: uniqueCities[1].lat
            })}

        if (uniqueCities.length > 2) {
          setThirdCity({
            name: uniqueCities[2].name,
            country:uniqueCities[2].country,
            lon: uniqueCities[2].lon,
            lat: uniqueCities[2].lat
          })}

        if (uniqueCities.length > 3) {
          setForthCity({
            name: uniqueCities[3].name,
            country:uniqueCities[3].country,
            lon: uniqueCities[3].lon,
            lat: uniqueCities[3].lat
          })}

        if (uniqueCities.length > 4) {
          setFifthCity({
            name: uniqueCities[4].name,
            country:uniqueCities[4].country,
            lon: uniqueCities[4].lon,
            lat: uniqueCities[4].lat
          })}

      } else { 
        // there is only one city with the filled name

        // Fetching the data
          const api_call_single = await fetch(`${api.urlWeather}?q=${query}&units=metric&appid=${api.key}`);
          const data = await api_call_single.json();
          // there is a city with this name
          if (data.name) { 
            setIsMultipleCities(0);
            setCity(data.name);
            setCountry(data.sys.country);
            setTemp(Math.round(data.main.temp));
            setHumidity(data.main.humidity)
            setWeather(data.weather[0].description);
            setQuery(""); 
            setUrlIcon(WeatherIconsUrl[`${data.weather[0].icon}`]);
            setPathIcon(`i${ data.weather[0].icon}`);
            setBackgroundClass(data.weather[0].main); 
          } 
          else {
            // Error / wrong input
            setIsMultipleCities(3);
            setError(data.message);
            setCity("");
            setUrlIcon("");
            setBackgroundClass("default");
          }
      
      }
    } else {
      // Error / wrong input
      setIsMultipleCities(3);
      setError("Check the city name and try again");
      setCity("");
      setUrlIcon("");
      setBackgroundClass("default");
    }
}

    // Function to get weather from MainInfo multiple choices on click
    const getWeatherForSingleCity = async (e) => {
      e.preventDefault();

      // Declaring longitude and latitude 
      let lon =  e.target.parentNode.getAttribute("lon"),
          lat = e.target.parentNode.getAttribute("lat");
      
      // Fetching the data for the city
      const api_call_multiple= await fetch(`${api.urlWeather}?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=${api.key}&units=metric`);
      const dataMultiple = await api_call_multiple.json();
      
        // there is a city with this name
        if (dataMultiple.name) { 
          setIsMultipleCities(0);
          setCity(dataMultiple.name);
          setCountry(dataMultiple.sys.country);
          setTemp(Math.round(dataMultiple.main.temp));
          setHumidity(dataMultiple.main.humidity)
          setWeather(dataMultiple.weather[0].description);
          setQuery(""); 
          setUrlIcon(WeatherIconsUrl[`${dataMultiple.weather[0].icon}`]);
          setPathIcon(`i${dataMultiple.weather[0].icon}`);
          setBackgroundClass(dataMultiple.weather[0].main); 
        } else { 
          // Error
          setIsMultipleCities(3);
          setError(dataMultiple.message);
          setCity("");
          setUrlIcon("");
          setBackgroundClass("default");
        }
  }

  return (
 
    <div className={`main-container background-${backgroundClass}`}>
      <div className="container">
        <Hero
          urlIcon={urlIcon}
          setUrlIcon={setUrlIcon}
          weather={weather}
          pathIcon={pathIcon}
        />
        <MainInfo 
          isMultipleCities={isMultipleCities}
          query={query}
          setQuery={setQuery}
          getWeather={getWeather}
          temp={temp}
          city={city}
          country={country}
          humidity={humidity}
          weather={weather}
          error={error}
          uniqueCities={uniqueCities}
          firstCity={firstCity}
          secondCity={secondCity}
          thirdCity={thirdCity}
          forthCity={forthCity}
          fifthCity={fifthCity}
          getWeatherForSingleCity={getWeatherForSingleCity}
        />
      </div>
    </div>
  );
}

export default App;
