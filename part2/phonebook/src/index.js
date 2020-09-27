import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "./index.css";

import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";

import PersonsList from "./components/PersonsList";
import PhonebookForm from "./components/PhonebookForm";
import personsDBService from "./components/PersonsDBService";
import Filter from "./components/Filter";

const App = () => {
  //state
  const [persons, setPersons] = useState("");
  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [filterResult, setFilterResult] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isMessageDisplayed, setIsMessageDisplayed] = useState(false);

  //helper functions

  const displayMessage = (messageType, message) => {
    let msg = "";
    switch (messageType) {
      case "error":
        msg = setErrorMessage;
        setErrorMessage(message);
        setSuccessMessage("");
        break;
      case "success":
        msg = setSuccessMessage;
        setSuccessMessage(message);
        setErrorMessage("");
        break;
      default:
        throw new Error("Invalid message type");
    }
    if (isMessageDisplayed) {
      clearTimeout(isMessageDisplayed);
    }
    let timeout = setTimeout(() => {
      msg("");
      setIsMessageDisplayed(false);
    }, 5000);
    setIsMessageDisplayed(timeout);
  };

  const clearInputs = () => {
    setNewName("");
    setNewPhoneNumber("");
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
    if (
      exists &&
      window.confirm(
        `The name ${existingPerson.name} already exists, do you want to update the phone number for selected person?`
      )
    ) {
      personsDBService.patchPersonNumber(
        persons,
        setPersons,
        setSuccessMessage,
        newPhoneNumber,
        existingPerson,
        newName
      );
      clearInputs();
    } else {
      const personObject = {
        name: newName,
        phone: newPhoneNumber,
      };
      personsDBService.create(
        personObject,
        persons,
        setPersons,
        displayMessage,
        personObject
      );
      clearInputs();
    }
  };

  //useEffect

  useEffect(() => {
    let db = axios.get("/api/persons");
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
    if (persons) {
      changeFilterResult();
    } else {
      setFilterResult("");
    }
  }, [filter, persons]);

  return (
    <div>
      <Filter filter={filter} setFilter={setFilter} />
      <h2>Phonebook</h2>
      <PhonebookForm
        newName={newName}
        newPhoneNumber={newPhoneNumber}
        setNewName={setNewName}
        setNewPhoneNumber={setNewPhoneNumber}
        handleNewNameAdd={handleNewNameAdd}
      ></PhonebookForm>
      <h2>Numbers</h2>
      {successMessage ? (
        <Alert variant="success">{successMessage}</Alert>
      ) : null}
      {errorMessage ? <Alert variant="danger">{errorMessage}</Alert> : null}
      {typeof filterResult === "object" ? (
        <PersonsList
          persons={persons}
          filteredPersons={filterResult}
          setPersons={setPersons}
          displayMessage={displayMessage}
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
