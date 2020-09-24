import React from "react";
import PersonsDBService from "./PersonsDBService";

const PersonsList = ({
  persons,
  filteredPersons,
  setPersons,
  setErrorMessage,
}) => {
  const newPersons = filteredPersons.map((person) => (
    <div key={person.id}>
      <li id={person.id}>
        {person.name} {person.phone}
      </li>
      <button
        type="button"
        className="btn btn-danger btn-sm"
        onClick={() => {
          PersonsDBService.delPerson(
            person.id,
            persons,
            setPersons,
            setErrorMessage
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
