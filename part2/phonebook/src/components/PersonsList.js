import React from "react";
import PersonsDBService from "./PersonsDBService";

const PersonsList = ({ persons, setPersons }) => {
  const newPersons = persons.map((person) => (
    <div key={person.id}>
      <li id={person.id}>
        {person.name} {person.number}
      </li>
      <button
        onClick={() => {
          PersonsDBService.delPerson(person.id, persons, setPersons);
        }}
      >
        Delete
      </button>
    </div>
  ));
  return <ul>{newPersons}</ul>;
};

export default PersonsList;
