import React, { useState } from 'react'
import Country from './Country';

const Countries = ({filterCountries}) => {
    const [countryInfo, setCountryInfo] = useState("")
   
  return (
    <div>
      {filterCountries.length === 1 ? (
        <Country countryInfo={filterCountries[0]} />
      ) : filterCountries.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : (
        filterCountries.map((item) => (
          <div key={item.name.common}>
            <span>{item.name.common}</span>
            <button onClick={() => setCountryInfo(item)}>show</button>
            {countryInfo === item && <Country countryInfo={countryInfo} />}
          </div>
        ))
      )}
    </div>
  );
}

export default Countries