import React from "react";

import './HiddenWordsList.scss';

/*
{definition, language, word}
*/
export default function HiddenWordsList(props) {
  
  const hiddenWords = props.words.map(word => {
    return <div className="hidden-words-board-words">{word.word}</div>  
  });

  return (
    <div className="hidden-words-board">
      {hiddenWords}
    </div>
  );
}