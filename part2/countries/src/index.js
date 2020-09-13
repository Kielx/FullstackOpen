import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import MyList from "./components/MyList";
import Input from "./components/Input";
import axios from "axios";

const App = () => {
  //state
  const [country, setCountry] = useState("");
  const [filter, setFilter] = useState("");
  const [filteredResults, setFilteredResults] = useState("");
  const [tooMany, setTooMany] = useState(false);

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
        console.log("more than 10");
        setTooMany(true);
      } else {
        setTooMany(false);
      }
    };

    changeFilterResult();
    checkIfTooMany();
  }, [filter, country, filteredResults.length]);

  return (
    <>
      <h1>Hello</h1>
      <Input val={filter} changeHandler={handleFilter} name="Filtr"></Input>
      {tooMany ? "Too many results" : <MyList data={filteredResults}></MyList>}
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
