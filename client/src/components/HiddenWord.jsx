import React from "react";
import HiddenWordsList from "./HiddenWordsList";

import './HiddenWord.scss';
const classNames = require('classnames');

export default function HiddenWord(props) {

  const wordClass = classNames('hidden-words-board-words', {'found': props.found});
  return (
    <div className={wordClass}>
        {props.word.toUpperCase()}
    </div>    
  );
}