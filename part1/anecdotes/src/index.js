import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import NextButton from "./components/NextButton";
import VoteButton from "./components/VoteButton";

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

//create object for points filled with zeros
const myObj = {};
for (let i = 0; i < anecdotes.length; i++) {
  myObj[i] = 0;
}

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(myObj);
  const [highest, setHighest] = useState(0);

  const handleNextAnecdoteClick = () => {
    let rand = Math.floor(Math.random() * anecdotes.length);
    while (rand === selected) {
      rand = Math.floor(Math.random() * anecdotes.length);
    }
    return setSelected(rand);
  };

  const handleVote = () => {
    const copy = { ...points };
    copy[selected] += 1;
    setPoints({ ...copy });
  };

  useEffect(() => {
    let test = Object.keys(points).reduce((a, b) =>
      points[a] > points[b] ? a : b
    );
    setHighest(test);
  }, [points]);

  return (
    <>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]}</p>
      <NextButton
        handleNextAnecdoteClick={handleNextAnecdoteClick}
      ></NextButton>
      <VoteButton handleVote={handleVote} points={points}></VoteButton>
      <p>has {points[selected]} votes</p>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[highest]}</p>
    </>
  );
};

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
