import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import PersonsList from "./components/PersonsList";
import Input from "./components/Input";
import axios from "axios";

const App = () => {
  //state
  const [persons, setPersons] = useState([{ id: 1, name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [currId, setCurrId] = useState(4);
  const [filter, setFilter] = useState("");
  const [filterResult, setFilterResult] = useState([{}]);

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
      setPersons(
        persons.concat({
          id: currId,
          name: newName,
          number: newPhoneNumber,
        })
      );
      setCurrId(currId + 1);
    }
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

    changeFilterResult();
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
      <PersonsList persons={filterResult}></PersonsList>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
