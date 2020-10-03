import React, { Children } from "react";
import DifficultyButton from "./DifficultyButton";
import NewGameSetup from './NewGameSetup';
//import useApplicationData from '../hooks/useApplicationData';
import GridRow from "./GridRow";
import HiddenWordsList from './HiddenWordsList';

import './GameBoard.scss';

export default function GameBoard(props) {

  const gameGrid = props.game.rows.map((row, index) => {
    return <GridRow 
        key={index} 
        rowid={index} 
        row={row} 
        selectGameContent={props.selectGameContent}
        attempts={props.attempts}
        solved={props.solved}        
      />
  });
  //generate found words list
  const foundWords = props.solved.map(cord => {
    return cord.map(el => {
      return props.game.rows[el.row][el.col];
    }).join('');
  })
  console.log("found words", foundWords);
  return (
    <div>
      <div className='board-table'>
        {gameGrid}
      </div>
      <div>
        <HiddenWordsList 
          words={props.game.words} 
          foundWords={foundWords} 
        />
      </div>
    </div>
  );
}