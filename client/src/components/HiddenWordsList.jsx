import React from "react";
import HiddenWord from './HiddenWord';

import './HiddenWordsList.scss';

/*
{definition, language, word}
*/

export default function HiddenWordsList(props) {
  
  const getFoundStatus = word => {
    if(props.foundWords.includes(word.toUpperCase())) {
      return true;
    }
    if(props.foundWords.includes(word.split('').reverse().join('').toUpperCase())) {
      return true;
    }
    return false;
  };

  const hiddenWords = props.words.map((word, index) => {
    const foundStatus = getFoundStatus(word.word);
    return <HiddenWord 
      key={index} 
      word={word.word} 
      found={foundStatus}
    />  
  });

  return (
    <div className="hidden-words-board">
      {hiddenWords}
    </div>
  );
}