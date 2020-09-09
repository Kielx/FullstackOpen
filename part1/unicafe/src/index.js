import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Header from "./components/Header";
import Button from "./components/Button";

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [allClicks, setAllClicks] = useState(0);

  useEffect(() => {
    setAllClicks(good + neutral + bad);
  });

  const handleClick = (state, setState) => {
    setState(state + 1);
  };

  return (
    <>
      <Header></Header>
      <Button
        handleClick={() => handleClick(good, setGood)}
        name="good"
      ></Button>
      <Button
        handleClick={() => handleClick(neutral, setNeutral)}
        name="neutral"
      ></Button>
      <Button handleClick={() => handleClick(bad, setBad)} name="bad"></Button>
      <h1>statistics</h1>
      <p>good {good} </p>
      <p>neutral {neutral} </p>
      <p>bad {bad} </p>
      <p>allClicks {allClicks}</p>
      <p>average {(good - bad) / allClicks} </p>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
