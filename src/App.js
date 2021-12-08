import React, {useState} from "react";
import './Styles/App.css'; //Style

//Components
import Hero from "./Components/Hero";
import MainInfo from "./Components/MainInfo";

function App() {

  const api = {
    keyWeather: "62951645c0615e879b3516cb49b80862",
    urlWeather: "https://api.openweathermap.org/data/2.5/weather",
    keyNews: "84fd70a661454198ae07e20910962bb7",
    urlNews: "https://newsapi.org/v2/everything"
  }

  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState("");
  const [news, setNews] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");

  const search = (e) => {
    if (e.key === "Enter") {

      fetch(`${api.urlWeather}?q=${query}&units=metric&appid=${api.keyWeather}`)
        .then (res => res.json())
        .then(resultWeather => {
          setWeather(resultWeather);
          setQuery("");
          console.log(resultWeather);
          console.log(weather);
        });

        // fetch(`${api.urlNews}?q=${query}&sortBy=publishedAt&apiKey=${api.keyNews}`)
        // .then (resNews => resNews.json())
        // .then(resultNews => {
        //   setNews(resultNews);
        //   console.log(resultNews);
        // });
       
    }
  }



  return (
    <div className="background main-container">
      <div className="container">
        <Hero/>
        <MainInfo/>
      </div>
    </div>
  );
}

export default App;
