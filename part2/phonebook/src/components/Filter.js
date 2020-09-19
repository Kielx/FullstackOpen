import React from "react";
import Input from "./Input";

const Filter = ({ filter, setFilter }) => {
  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  return (
    <Input
      val={filter}
      changeHandler={handleFilter}
      name={"Filter results"}
    ></Input>
  );
};

export default Filter;
