import React, { Children } from "react";
import DifficultyButton from "./DifficultyButton";
import NewGameSetup from './NewGameSetup';
//import useApplicationData from '../hooks/useApplicationData';
import GridRow from "./GridRow";
import HiddenWordsList from './HiddenWordsList';

import './GameBoard.scss';

export default function GameBoard(props) {

/*   const {
    state,
    setDifficulty,
    getNewGame,
  } = useApplicationData();
 */
  const gameGrid = props.game.rows.map((row, index) => {
    return <GridRow 
        key={index} 
        rowid={index} 
        row={row} 
        selectGameContent={props.selectGameContent}
        currentAttempts={props.currentAttempts}
        solvedAttempts={props.solvedAttempts}        
      />
  });
  return (
    <div>
      <div className='board-table'>
        {gameGrid}
      </div>
      <div>
        <HiddenWordsList words={props.game.words} />
      </div>
    </div>
  );
}