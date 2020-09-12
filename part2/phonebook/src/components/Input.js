import React from "react";

const Input = ({ val, changeHandler, name }) => {
  return (
    <div>
      <label htmlFor={name}>{name}</label>
      <input id={name} value={val} onChange={changeHandler} />
    </div>
  );
};

export default Input;
