import React from "react";
import PersonsDBService from "./PersonsDBService";

const PersonsList = ({
  persons,
  filteredPersons,
  setPersons,
  displayMessage,
}) => {
  const newPersons = filteredPersons.map((person) => (
    <div key={person._id}>
      <li id={person._id}>
        {person.name} {person.phone}
      </li>
      <button
        type="button"
        className="btn btn-danger btn-sm"
        onClick={() => {
          PersonsDBService.delPerson(
            person._id,
            persons,
            setPersons,
            displayMessage
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
