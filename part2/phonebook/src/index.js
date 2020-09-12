import React, { useState } from "react";
import ReactDOM from "react-dom";
import PersonsList from "./components/PersonsList";

const App = () => {
  const [persons, setPersons] = useState([{ id: 1, name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");
  const [currId, setCurrId] = useState(2);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
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
      setPersons(persons.concat({ id: currId, name: newName }));
      setCurrId(currId + 1);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button onClick={handleNewNameAdd} type="Submit">
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      ...
      <PersonsList persons={persons}></PersonsList>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
