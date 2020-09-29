import React from "react";
import "./DifficultyButton.scss";
//const classNames = require('classnames');

export default function DifficultyButton(props) {

  let buttonClass = props.selected ? "difficultybutton selected" : "difficultybutton";

  return (
    <button class={buttonClass}
    onClick={() => props.onClick(props.name)}
    >
    {props.name}
  </button>  
  );
}