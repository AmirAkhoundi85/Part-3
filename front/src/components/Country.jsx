import axios from "axios";
import React, { useEffect, useState } from "react";

const Country = ({ countryInfo }) => {
  const languages = Object.values(countryInfo.languages);
  const api_key= process.env.REACT_APP_API_KEY;
  const[weather, setWeather]= useState(null)

  useEffect(() => {
    axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${countryInfo.capital}&appid=${api_key}`
    ).then((res)=>res.data)
    .then((data)=>setWeather(data));

  }, [])
  
  
  return (
    <>
      <h1>{countryInfo.name.common}</h1>
      <p> Capital {countryInfo.capital}</p>
      <p> area {countryInfo.area}</p>
      <p>
        <strong>Langueges</strong>
      </p>
      <ul>
        {languages.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <img src={countryInfo.flags.png} alt={countryInfo.flags.alt} />
      <h2>Weather in {countryInfo.name.common}</h2>
      {weather && (
        <div>
          <p>temprature {(weather.main.temp - 273).toFixed(2)}</p>
          <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" />
          <p>Wind {weather.wind.speed} m/s</p>
        </div>
      )}
    </>
  );
};

export default Country;
