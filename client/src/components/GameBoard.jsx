import React, { Children } from "react";
import DifficultyButton from "./DifficultyButton";
import NewGameSetup from './NewGameSetup';
import GridRow from "./GridRow";
import GameScore from './GameScore';
import GameTimer from './GameTimer';
import HiddenWordsList from './HiddenWordsList';
import GameScoreBroadcast from './GameScoreBroadcast';

import './GameBoard.scss';

import io from 'socket.io-client'
const socket = io.connect('http://localhost:3001')

export default function GameBoard(props) {

  const gameGrid = props.game.rows.map((row, index) => {
    return <GridRow 
        key={index} 
        rowid={index} 
        row={row} 
        selectGameContent={props.selectGameContent}
        attempts={props.attempts}
        solved={props.solved} 
        opponentSolved={props.opponentSolved}       
      />
  });
  //generate foundwords list
  const foundWords = props.solved.map(cord => {
    return cord.map(el => {
      return props.game.rows[el.row][el.col];
    }).join('');
  });

  const opponentFoundWords = props.opponentSolved.map(cord => {
    return cord.map(el => {
      return props.game.rows[el.row][el.col];
    }).join('');
  });

  return (
    <div>
      <div className="game-board-score-container">
        <GameScore score={props.score} wordCount={props.game.words.length} />
        <GameTimer  duration={props.duration} endGame={props.endGame} multiplayer={props.multiplayer} />
      </div>

      <div className="game-board-grid">
        <div className='board-table'>
          {gameGrid}
        </div>
        <div className="game-board-words-list">
          <HiddenWordsList 
            words={props.game.words} 
            foundWords={foundWords} 
            opponentFoundWords={opponentFoundWords}
          />
        </div>
      </div>
      <div className='game-board-buttons-container'>
      { props.multiplayer 
      ?  <div><button className="game-board-buttons" onClick={props.cancelScreen}>Leave Game</button></div>
      :  <div><button className="game-board-buttons" onClick={props.cancelScreen}>Cancel</button></div>
      }
      </div>
    </div>
  );
}