import React from "react";

const PersonsList = ({ persons }) => {
  const newPersons = persons.map((person) => (
    <li key={Math.random()}>
      {person.name} {person.number}
    </li>
  ));
  return <ul>{newPersons}</ul>;
};

export default PersonsList;
