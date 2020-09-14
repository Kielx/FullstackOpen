import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import MyList from "./components/MyList";
import Input from "./components/Input";
import axios from "axios";
import CountryDetails from "./components/CountryDetails";

const App = () => {
  //state
  const [country, setCountry] = useState("");
  const [filter, setFilter] = useState("");
  const [filteredResults, setFilteredResults] = useState("");
  const [tooMany, setTooMany] = useState(false);
  const [weather, setWeather] = useState("");

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  useEffect(() => {
    let db = axios.get("https://restcountries.eu/rest/v2/all");
    db.then((res) => {
      setCountry(res.data);
    });
  }, []);

  useEffect(() => {
    const changeFilterResult = () => {
      let filteredCountries = "";
      if (country) {
        filteredCountries = country.filter((countr) => {
          return countr.name.toLowerCase().includes(filter.toLowerCase());
        });
        return setFilteredResults(filteredCountries);
      } else {
        return "Loading...";
      }
    };
    const checkIfTooMany = () => {
      if (filteredResults.length > 10) {
        setTooMany(true);
      } else {
        setTooMany(false);
      }
    };

    changeFilterResult();
    checkIfTooMany();
  }, [filter, country, filteredResults.length]);

  useEffect(() => {
    const dispWeather = (country) => {
      let weather = axios.get(
        `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_WEATHERSTACK}&query=${country}`
      );
      weather
        .then((res) => {
          console.log(res);
          if (res.data.current.temperature) {
            setWeather(res.data.current.temperature);
          }
        })
        .catch((reason) => {
          console.log(reason);
        });
    };

    filteredResults.length === 1
      ? dispWeather(filteredResults[0].capital)
      : console.log("false");
  }, [filteredResults.length]);

  return (
    <>
      <h1>Find countries by country name</h1>
      <Input val={filter} changeHandler={handleFilter} name="Filtr"></Input>
      {tooMany ? (
        "Too many results, please narrow down your search"
      ) : filteredResults.length === 1 ? (
        <>
          <CountryDetails country={filteredResults[0]} weather={weather} />
        </>
      ) : (
        <MyList data={filteredResults}></MyList>
      )}
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
