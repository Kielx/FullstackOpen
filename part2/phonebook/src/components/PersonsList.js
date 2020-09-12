import React from "react";

const PersonsList = ({ persons }) => {
  const newPersons = persons.map((person) => (
    <li key={person.name}>
      {person.name} {person.phone_number}
    </li>
  ));
  return newPersons;
};

export default PersonsList;
