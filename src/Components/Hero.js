import React from "react";
import '../Styles/Hero.css';


function Hero({
    urlIcon,
    weather,
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
     ) : false}

</div>
);
}

export default Hero;