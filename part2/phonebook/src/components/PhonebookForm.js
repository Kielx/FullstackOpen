import React from "react";
import Input from "./Input";

export default function PhonebookForm({
  newName,
  newPhoneNumber,
  setNewName,
  setNewPhoneNumber,
  handleNewNameAdd,
}) {
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNewPhoneNumber = (event) => {
    setNewPhoneNumber(event.target.value);
  };

  return (
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
      <button
        type="button"
        className="btn btn-primary"
        onClick={handleNewNameAdd}
      >
        Add new phonebook record
      </button>
    </form>
  );
}
