import React from "react";
import ReactDOM from "react-dom";

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  const Header = ({ course }) => {
    return <h1>{course.name}</h1>;
  };

  const Part = ({ parts }) => {
    return (
      <li>
        {parts.name} {parts.exercises}
      </li>
    );
  };
  const Content = ({ parts }) => {
    const newItems = parts.map((item) => {
      return <Part parts={item} />;
    });
    return <ol> {newItems} </ol>;
  };

  const Total = ({ parts }) => {
    let sum = 0;
    parts.forEach((element) => {
      sum += element.exercises;
    });

    return <p>{`Number of exercises ${sum} `}</p>;
  };

  return (
    <>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
