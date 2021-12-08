import React from "react";
import "../Styles/MainInfo.css"; // Styles

// Components

function MainInfo({

}) {


return (

<div className="info-container">
    <div className="srch-container">
        <input type="text" className="input" />
    </div>
    <div className="main-info-container">
        <div className="item location">Location:</div>
        <div className="item temp">Temperature:</div>
        <div className="item weather">Weather:</div>
        <div className="item humidity">Humidity:</div>
    </div>
</div>
);
}

export default MainInfo;