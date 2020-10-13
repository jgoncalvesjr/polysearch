import React from "react";

import './HiddenWord.scss';
const classNames = require('classnames');

export default function HiddenWord(props) {

  const wordClass = classNames('hidden-words-board-words', {'found': props.found, 'opponent-found': props.opponentFoundStatus});
  return (
    <div className={wordClass}>
        {props.word.toUpperCase()}
    </div>    
  );
}