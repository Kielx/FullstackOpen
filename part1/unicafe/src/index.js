import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Header from "./components/Header";
import Button from "./components/Button";
import Statistic from "./components/Statistic";

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [allClicks, setAllClicks] = useState(0);
  const [feedbackGiven, setFeedbackGiven] = useState(false);

  const states = { good, neutral, bad, allClicks, feedbackGiven };

  useEffect(() => {
    setAllClicks(good + neutral + bad);
  }, [good, bad, neutral]);

  const handleClick = (state, setState) => {
    setState(state + 1);
    setFeedbackGiven(true);
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
      {feedbackGiven === true ? (
        <>
          <Statistic text="good" states={states} />
          <Statistic text="neutral" states={states} />
          <Statistic text="bad" states={states} />
          <Statistic text="allClicks" states={states} />
          <Statistic text="average" states={states} />
          <Statistic text="positivePercent" states={states} />
        </>
      ) : (
        <p>No feedback given yet</p>
      )}
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
