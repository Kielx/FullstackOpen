import React from "react";

const PersonsList = ({ persons }) => {
  const newPersons = persons.map((person) => (
    <li key={person.name}>{person.name}</li>
  ));
  return newPersons;
};

export default PersonsList;
