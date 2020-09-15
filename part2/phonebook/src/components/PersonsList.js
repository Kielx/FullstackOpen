import React from "react";

const PersonsList = ({ persons, delPerson }) => {
  const newPersons = persons.map((person) => (
    <div key={person.id}>
      <li id={person.id}>
        {person.name} {person.number}
      </li>
      <button onClick={() => delPerson(person.id)}>Delete</button>
    </div>
  ));
  return <ul>{newPersons}</ul>;
};

export default PersonsList;
