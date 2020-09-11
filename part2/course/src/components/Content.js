import React from "react";
import Part from "./Part";

const Content = ({ parts }) => {
  const newItems = parts.map((item) => {
    return <Part parts={item} key={Math.random()} />;
  });
  return <ol> {newItems} </ol>;
};

export default Content;
