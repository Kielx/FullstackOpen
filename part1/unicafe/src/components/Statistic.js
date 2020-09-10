import React from "react";

const Statistic = (props) => {
  if (props.states.feedbackGiven === true) {
    if (props.text === "allClicks") {
      return (
        <>
          <p>{`You clicked ${props.states.allClicks} times`}</p>
        </>
      );
    } else if (props.text === "average" && props.states.allClicks > 0) {
      return (
        <>
          <p>{`Average rating is ${
            (props.states.good - props.states.bad) / props.states.allClicks
          }`}</p>
        </>
      );
    } else if (props.text === "positivePercent" && props.states.allClicks > 0) {
      return (
        <>
          <p>{`Positive percent of votes ${
            (props.states.good * 100) / props.states.allClicks
          }%`}</p>
        </>
      );
    } else if (
      props.text === "good" ||
      props.text === "bad" ||
      props.text === "neutral"
    ) {
      return (
        <>
          <p>
            {props.text} {props.states[props.text]}
          </p>
        </>
      );
    } else return "";
  } else return "";
};
export default Statistic;
