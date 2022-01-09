import React from "react";
import '../Styles/SearchForm.css';

// Components

function SearchForm({
    setQuery,
    query,
    getWeather,

}) {

return (

    <form className="srch-container" onSubmit={getWeather}>
        <input type="text" 
            className="input-field"
            onChange={e => setQuery(e.target.value)}
            value={query}
            placeholder="City name"
            id="search-input1"
            />
        <button className="srch-btn fa fa-search" onClick={getWeather}></button>
    </form>
);
}

export default SearchForm;

