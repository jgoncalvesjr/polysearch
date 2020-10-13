import React from "react";

import './GameScore.scss';
export default function GameScore(props) {

  return (
    <div className='score-container'>{props.score} / {props.wordCount}</div>
  );
}