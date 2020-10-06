import React from "react";

import './GameScore.scss';
export default function GameScore(props) {
  //score={solved.length} wordCount={props.game.words.length
  return (
    <div className='score-container'>{props.score} / {props.wordCount}</div>
  );
}