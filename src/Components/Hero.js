import React from "react";
import '../Styles/Hero.css';

// Components

// Images and Icons
import i01d from '../Images/icons/i01d.png';
import i01n from '../Images/icons/i01n.png';
import i02d from '../Images/icons/i02d.png';
import i02n from '../Images/icons/i02n.png';
import i03d from '../Images/icons/i03d.png';
import i03n from '../Images/icons/i03d.png';
import i04d from '../Images/icons/i04d.png';
import i04n from '../Images/icons/i04d.png';
import i09d from '../Images/icons/i09d.png';
import i09n from '../Images/icons/i09d.png';
import i10d from '../Images/icons/i10d.png';
import i10n from '../Images/icons/i10n.png';
import i11d from '../Images/icons/i11d.png';
import i11n from '../Images/icons/i11d.png';
import i13d from '../Images/icons/i13d.png';
import i13n from '../Images/icons/i13d.png';
import i50d from '../Images/icons/i50d.png';
import i50n from '../Images/icons/i50d.png';


function Hero({
    urlIcon,
    setUrlIcon,
    weather,
    WeatherIconsLocalPath,
    pathIcon
}) {

    /* Getting current date */
    const currentDate = (d) => {
        
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "August", "September", "Oct", "Nov","Dec"];
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        
        const day = days[d.getDay()];
        const date = d.getDate();
        const month = months[d.getMonth()];
        let year = d.getFullYear();
        return `${day} ${date} ${month} ${year}`
    };

return (

<div className="hero-container">
    <h1 className="header">Weather app</h1>
    <h3 className="date-container">{currentDate(new Date())}</h3>

    
     {(urlIcon) ? (
        <img className="weather-icon" src={urlIcon}  alt={weather}></img>
     ) : (<img className="weather-icon" alt="" ></img>)}

</div>
);
}

export default Hero;