import React from "react";

/*
{definition, language, word}
*/
export default function HiddenWordsList(props) {
  
  const hiddenWords = props.words.map(word => {
  return <div>{word.word}</div>  
  })
  return (
    {}
  );
}