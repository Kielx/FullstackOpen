import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import PersonsList from "./components/PersonsList";
import Input from "./components/Input";
import axios from "axios";
import personsDBService from "./components/PersonsDBService";
import Notification from "./components/Notification";
import "./index.css";

import Spinner from "react-bootstrap/Spinner";

const App = () => {
  //state
  const [persons, setPersons] = useState("Loading");
  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [filterResult, setFilterResult] = useState("");
  const [message, setMessage] = useState("");

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
    let existingPerson;
    let exists = false;
    persons.forEach((person) => {
      if (Object.values(person).includes(newName)) {
        exists = true;
        existingPerson = person;
      }
    });
    if (exists) {
      if (
        window.confirm(
          `The name ${existingPerson.name} already exists, do you want to update the phone number for selected person?`
        )
      ) {
        let res = axios.patch(
          `http://localhost:3001/persons/${existingPerson.id}`,
          { number: newPhoneNumber }
        );
        res.then((res) => {
          let index = persons.indexOf(existingPerson);
          let temp = [...persons];
          temp[index] = res.data;
          setPersons(temp);

          setMessage({
            message: `${newName} phone number was updated to ${newPhoneNumber} successfully!`,
            className: "alert alert-success",
          });
          setTimeout(() => {
            setMessage("");
          }, 5000);

          setNewName("");
          setNewPhoneNumber("");
        });
      }
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

          setMessage({
            message: `${personObject.name} with phone number ${personObject.number} was successfully created`,
            className: "alert alert-success",
          });
          setTimeout(() => {
            setMessage("");
          }, 5000);
        })
        .catch(function (error) {
          console.log(error);
        });
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
    if (persons !== "Loading") {
      changeFilterResult();
    } else {
      setFilterResult("");
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
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleNewNameAdd}
        >
          Add new phonebook record
        </button>
      </form>
      <h2>Numbers</h2>
      <Notification
        className={typeof message === "object" ? message.className : ""}
        message={typeof message === "object" ? message.message : ""}
      ></Notification>
      {typeof filterResult === "object" ? (
        <PersonsList
          persons={persons}
          filteredPersons={filterResult}
          setPersons={setPersons}
          setMessage={setMessage}
        ></PersonsList>
      ) : (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
