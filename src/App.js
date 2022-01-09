import React, {useEffect, useState} from 'react';
import './Styles/App.css'; //Style

//Components
import Hero from "./Components/Hero";
import MainInfo from "./Components/MainInfo";


/* improvements 
- local images/icons if web is broken
- Autocomplete the name and check if it is compatable with API 
*/ 

const api = {
  key: "62951645c0615e879b3516cb49b80862",
  urlWeather: "https://api.openweathermap.org/data/2.5/weather",
  urlLocation: "http://api.openweathermap.org/geo/1.0/reverse",
  urlMultipleLocations: "http://api.openweathermap.org/geo/1.0/direct"
}


function App() {

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

  const WeatherIconsLocalPath = {
    "01d": "../Images/icons/i01d.png",
    "01n": "../Images/icons/i01n.png",
    "02d": "../Images/icons/i02d.png",
    "02n": "../Images/icons/i02n.png",
    "03d": "../Images/icons/i03d.png",
    "03n": "../Images/icons/i03d.png",
    "04d": "../Images/icons/i04d.png",
    "04n": "../Images/icons/i04d.png",
    "09d": "../Images/icons/i09d.png",
    "09n": "../Images/icons/i09d.png",
    "10d": "../Images/icons/i10d.png",
    "10n": "../Images/icons/i10n.png",
    "11d": "../Images/icons/i11d.png",
    "11n": "../Images/icons/i11d.png",
    "13d": "../Images/icons/i13d.png",
    "13n": "../Images/icons/i13d.png",
    "50d": "../Images/icons/i50d.png",
    "50n": "../Images/icons/i50d.png"
  };

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
  var arrOfCities = [];


  /* Initial current geolocation and weather */
  // useEffect(() => {
  //   const fetchCurrentCity= async () => {
  //     navigator.geolocation.getCurrentPosition(function (position) {
  //       setLatitude(position.coords.latitude);
  //       setLongitude(position.coords.longitude);
  //     });

  //     if(longitude && latitude) {
  //       const api_call_current = await fetch(`${api.urlLocation}?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&appid=${api.key}&units=metric`);
  //       const data_current_location = await api_call_current.json();
       
  //       if(data_current_location[0].name) {
  //         const api_call_current_weather = await fetch(`${api.urlWeather}?q=${data_current_location[0].name}&units=metric&appid=${api.key}`);
  //         const data_current_weather = await api_call_current_weather.json();
  //         setQuery(data_current_location[0].name);
  //         setCity(data_current_weather.name);
  //         setCountry(data_current_weather.sys.country);
  //         setTemp(Math.round(data_current_weather.main.temp));
  //         setHumidity(data_current_weather.main.humidity)
  //         setWeather(data_current_weather.weather[0].description);
  //         setUrlIcon(WeatherIconsUrl[`${data_current_weather.weather[0].icon}`]);
  //         setPathIcon("i" + data_current_weather.weather[0].icon);
  //         setBackgroundClass(data_current_weather.weather[0].main) 
  //       } else {
  //         setError("Please turn on location");
  //       }
  //   }
  // }
  // fetchCurrentCity();

  // }, [latitude, longitude])


  /* Fetching the weather on the filled city */
  const getWeather = async (e) => {
    e.preventDefault();

    const api_call_check = await fetch(`${api.urlMultipleLocations}?q=${query}&limit=5&units=metric&appid=${api.key}`);
    const data_check = await api_call_check.json();
    console.log(data_check);

    if(data_check[1]) {

      for (let i = 0; i < 5; i++) {
        arrOfCities[i] = {
          name: data_check[i].name,
          country: data_check[i].country
        }
       // var newArray = arrOfCities.push(newCityObj);
      //  arrOfCities = newArray;
       
        var uniqueCities = [...new Set(arrOfCities)];
        console.log(uniqueCities);
      }
    } else {
      const api_call = await fetch(`${api.urlWeather}?q=${query}&units=metric&appid=${api.key}`);
    const data = await api_call.json();

      if (false) {
        setCity(data.name);
        setCountry(data.sys.country);
        setTemp(Math.round(data.main.temp));
        setHumidity(data.main.humidity)
        setWeather(data.weather[0].description);
        setQuery(""); // Reset the search bar
        setUrlIcon(WeatherIconsUrl[`${data.weather[0].icon}`]);
        setPathIcon(`i${ data.weather[0].icon}`);
        console.log(setPathIcon);
        setBackgroundClass(data.weather[0].main); //Background 
      } 
      else {
        setError(data.message);
        setCity("");
        setUrlIcon("");
        setBackgroundClass("default");
      }
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
          WeatherIconsLocalPath={WeatherIconsLocalPath}
          pathIcon={pathIcon}
        />
        <MainInfo 
          query={query}
          setQuery={setQuery}
          getWeather={getWeather}
          temp={temp}
          city={city}
          country={country}
          humidity={humidity}
          weather={weather}
          error={error}
        />
      </div>
    </div>
  );
}

export default App;
