import React, { useState } from "react";
import ReactDOM from "react-dom";
import PersonsList from "./components/PersonsList";
import Input from "./components/Input";

const App = () => {
  //state
  const [persons, setPersons] = useState([{ id: 1, name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [currId, setCurrId] = useState(2);

  //helper functions
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNewPhoneNumber = (event) => {
    setNewPhoneNumber(event.target.value);
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
          phone_number: newPhoneNumber,
        })
      );
      setCurrId(currId + 1);
    }
  };

  return (
    <div>
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
      ...
      <PersonsList persons={persons}></PersonsList>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
