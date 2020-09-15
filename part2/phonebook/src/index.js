import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import PersonsList from "./components/PersonsList";
import Input from "./components/Input";
import axios from "axios";
import personsDBService from "./components/PersonsDBService";

const App = () => {
  //state
  const [persons, setPersons] = useState("Loading");
  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [filterResult, setFilterResult] = useState("");

  //helper functions
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNewPhoneNumber = (event) => {
    setNewPhoneNumber(event.target.value);
  };

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };
  const handleNewNameAdd = (event) => {
    event.preventDefault();
    let exists = false;
    persons.forEach((person) => {
      if (Object.values(person).includes(newName)) {
        exists = true;
      }
    });
    if (exists) {
      alert(`${newName} already exists`);
    } else {
      const personObject = {
        name: newName,
        number: newPhoneNumber,
      };
      personsDBService
        .create(personObject)
        .then(function (response) {
          setPersons(persons.concat(response));
          setNewName("");
          setNewPhoneNumber("");
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const delPerson = (id) => {
    axios
      .delete(`http://localhost:3001/persons/${id}`)
      .then((response, pr) => {
        if (response.status === 200 && response.statusText === "OK") {
          pr = persons.filter((person) => person.id !== id);
          setPersons(pr);
        }
      })
      .catch((err, db) => {
        console.log(err);
        db = axios.get("http://localhost:3001/persons");
        db.then((res) => {
          setPersons(res.data);
        });
      });
  };
  //useEffect

  useEffect(() => {
    let db = axios.get("http://localhost:3001/persons");
    db.then((res) => {
      setPersons(res.data);
    });
  }, []);

  useEffect(() => {
    const changeFilterResult = () => {
      let filteredPersons = persons.filter((person) => {
        return person.name.toLowerCase().includes(filter.toLowerCase());
      });
      return setFilterResult(filteredPersons);
    };
    if (persons !== "Loading") {
      changeFilterResult();
    } else {
      setFilterResult("Loading... Please wait");
    }
  }, [filter, persons]);

  return (
    <div>
      <Input
        val={filter}
        changeHandler={handleFilter}
        name={"Filter results"}
      ></Input>
      <h2>Phonebook</h2>
      <form>
        <Input
          val={newName}
          changeHandler={handleNameChange}
          name={"Name:"}
        ></Input>
        <Input
          val={newPhoneNumber}
          changeHandler={handleNewPhoneNumber}
          name={"Phone number:"}
        ></Input>
        <button onClick={handleNewNameAdd} type="Submit">
          Add new phonebook record
        </button>
      </form>
      <h2>Numbers</h2>
      {typeof filterResult === "object" ? (
        <PersonsList persons={filterResult} delPerson={delPerson}></PersonsList>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
