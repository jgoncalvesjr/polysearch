import React from "react";
import HiddenWord from './HiddenWord';

import './HiddenWordsList.scss';

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
//
  const getOpponentFoundStatus = word => {
    if(props.opponentFoundWords.includes(word.toUpperCase())) {
      return true;
    }
    if(props.opponentFoundWords.includes(word.split('').reverse().join('').toUpperCase())) {
      return true;
    }
    return false;
  };

  const hiddenWords = props.words.map((word, index) => {
    const foundStatus = getFoundStatus(word.word);
    const opponentFoundStatus = getOpponentFoundStatus(word.word);
    return <HiddenWord 
      key={index} 
      word={word.word} 
      found={foundStatus}
      opponentFoundStatus={opponentFoundStatus}
    />  
  });

  return (
    <div className="hidden-words-board">
      {hiddenWords}
    </div>
  );
}