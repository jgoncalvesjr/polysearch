import React from "react";
import "./DifficultyButton.scss";

export default function DifficultyButton(props) {

  let buttonClass = props.selected ? "difficultybutton selected" : "difficultybutton";

  return (
    <button className={buttonClass}
    onClick={() => props.onClick(props.name)}
    >
    {props.name}
  </button>  
  );
}