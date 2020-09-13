import React from "react";

const CountryDetails = ({ country }) => {
  return (
    <>
      <h2>{country.name}</h2>
      <p>{`Capital: ${country.capital}`}</p>
      <p>{`Population: ${country.population}`}</p>
      <p>{`Language: ${country.languages[0].name}`}</p>
      <img
        src={country.flag}
        alt="Country Flag"
        style={{ maxWidth: "150px", border: "1px solid black" }}
      ></img>
    </>
  );
};

export default CountryDetails;
