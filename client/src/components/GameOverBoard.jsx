import React, { Children } from "react";
import DifficultyButton from "./DifficultyButton";
import NewGameSetup from './NewGameSetup';
//import useApplicationData from '../hooks/useApplicationData';
import GridRow from "./GridRow";
import GameScore from './GameScore';
import GameTimer from './GameTimer';
import HiddenWordsList from './HiddenWordsList';

import './GameBoard.scss';

export default function GameOverBoard(props) {

  const gameGrid = props.game.rows.map((row, index) => {
    return <GridRow 
        key={index} 
        rowid={index} 
        row={row} 
        selectGameContent={() => {}}
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

  return (
    <div>
      <div style={{display:'flex', flexDirection: 'row'}}>
        <GameScore score={props.solved.length} wordCount={props.game.words.length} />
        {/*<GameTimer  duration={props.duration} endGame={props.endGame} multiplayer={props.multiplayer} />*/}
      </div>
      <div className='board-table'>
        {/*{gameGrid}*/}
        <div><h3>Game Over</h3></div>
        <div  style={{display: 'flex', flexDirection: 'column'}}>
        <div><button onClick={props.playAgain}>Play again</button></div>
        <div><button onClick={props.joinPolySearch}>Join Polysearch</button></div>
        <div><button onClick={props.showMain}>Back to Main</button></div>
      </div>        
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