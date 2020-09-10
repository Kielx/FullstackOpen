import React from "react";

const Statistic = (props) => {
  if (props.states.feedbackGiven === true) {
    if (props.text === "allClicks") {
      return (
        <tr>
          <td>{`Number of feedbacks`}</td>
          <td>{props.states.allClicks}</td>
        </tr>
      );
    } else if (props.text === "average" && props.states.allClicks > 0) {
      return (
        <tr>
          <td>{`Average rating is`}</td>
          <td>
            {(props.states.good - props.states.bad) / props.states.allClicks}
          </td>
        </tr>
      );
    } else if (props.text === "positivePercent" && props.states.allClicks > 0) {
      return (
        <tr>
          <td>{`Positive percent of votes`}</td>
          <td>{(props.states.good * 100) / props.states.allClicks}</td>
        </tr>
      );
    } else if (
      props.text === "good" ||
      props.text === "bad" ||
      props.text === "neutral"
    ) {
      return (
        <tr>
          <td>{props.text} </td> <td>{props.states[props.text]}</td>
        </tr>
      );
    } else
      return (
        <tr>
          <td></td>
        </tr>
      );
  } else
    return (
      <tr>
        <td></td>
      </tr>
    );
};
export default Statistic;
