import React from "react";
import PersonsDBService from "./PersonsDBService";

const PersonsList = ({ persons, filteredPersons, setPersons, setMessage }) => {
  const newPersons = filteredPersons.map((person) => (
    <div key={person.id}>
      <li id={person.id}>
        {person.name} {person.number}
      </li>
      <button
        type="button"
        className="btn btn-danger btn-sm"
        onClick={() => {
          PersonsDBService.delPerson(
            person.id,
            persons,
            setPersons,
            setMessage
          );
        }}
      >
        Delete
      </button>
    </div>
  ));
  return <ul>{newPersons}</ul>;
};

export default PersonsList;
