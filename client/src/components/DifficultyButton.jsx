import React from "react";
import "./DifficultyButton.scss";
//const classNames = require('classnames');

export default function DifficultyButton({caption, selected}) {

  //let buttonClass = classNames("button");
  let buttonClass = selected ? "difficultybutton selected" : "difficultybutton";

  console.log("caption", caption, "selected", selected);
  return (
    <button class={buttonClass}
    //onClick={props.onClick}
    //disabled={props.disabled}
    >
    {caption}
  </button>  
  );
}