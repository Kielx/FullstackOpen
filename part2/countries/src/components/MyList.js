import React from "react";
import CountryDetails from "./CountryDetails";

const MyList = ({ data }) => {
  const toggleVisibility = (el) => {
    let x = document.getElementById(el.name);
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
    let y = document.getElementById(el.alpha2Code);
    if (y.style.display === "none") {
      y.style.display = "block";
    } else {
      y.style.display = "none";
    }
  };

  if (data) {
    const newData = data.map((dat) => (
      <div key={dat.name}>
        <li style={{ display: "inline-block" }}>
          <p id={dat.alpha2Code}>{dat.name}</p>
          <div id={dat.name} style={{ display: "none" }}>
            <CountryDetails country={dat} />
          </div>
        </li>
        <button onClick={() => toggleVisibility(dat)}>Toggle</button>
      </div>
    ));
    return <ul>{newData}</ul>;
  } else {
    return "Loading...";
  }
};

export default MyList;
