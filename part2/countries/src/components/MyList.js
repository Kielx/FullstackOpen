import React from "react";

const MyList = ({ data }) => {
  if (data) {
    const newData = data.map((dat) => <li key={Math.random()}>{dat.name}</li>);
    return <ul>{newData}</ul>;
  } else {
    return "Loading...";
  }
};

export default MyList;
