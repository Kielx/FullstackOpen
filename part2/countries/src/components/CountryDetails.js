import React from "react";

const CountryDetails = ({ country, weather }) => {
  let languages = country.languages.map((language) => (
    <li key={language.name}>{language.name}</li>
  ));
  return (
    <>
      <h2>{country.name}</h2>
      <p>{`Capital: ${country.capital}`}</p>
      <p>{`Population: ${country.population}`}</p>
      <h3>Languages:</h3>
      <ol>{languages}</ol>
      <img
        src={country.flag}
        alt="Country Flag"
        style={{ maxWidth: "150px", border: "1px solid black" }}
      ></img>
      <p>{`Current temperature in capital: ${weather}`}</p>
    </>
  );
};

export default CountryDetails;
