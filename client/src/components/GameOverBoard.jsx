import React, { Children } from "react";
import DifficultyButton from "./DifficultyButton";
import NewGameSetup from './NewGameSetup';
import GridRow from "./GridRow";
import GameScore from './GameScore';
import GameTimer from './GameTimer';
import HiddenWordsList from './HiddenWordsList';
import LeaderBoard from './LeaderBoard';

import './GameBoard.scss';
import './GameLobby.scss';
import { People } from "@material-ui/icons";

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
  });

  const opponentFoundWords = props.opponentSolved.map(cord => {
    return cord.map(el => {
      return props.game.rows[el.row][el.col];
    }).join('');
  });

  const matchWinner = [...props.matchWinner];
  const localUser = localStorage.getItem('username') ? localStorage.getItem('username') : localStorage.getItem('guestuser');
  const localUsrAvatar = localStorage.getItem('avatar');
  const localUsrScore = {
    name: localUser,
    score: props.score,
    avatar: localUsrAvatar
  }
  matchWinner.push(localUsrScore);
  matchWinner.sort((obj1, obj2) => {
     return obj2.score  - obj1.score;
  });
  
  return (
    <div>
      <div className="game-board-score-container">
        <GameScore score={props.score} wordCount={props.game.words.length} />
        {/*<GameTimer  duration={props.duration} endGame={props.endGame} multiplayer={props.multiplayer} />*/}
      </div>
      
      <div className="game-board-grid">
        <div className='board-table'>
          {/*{gameGrid}*/}
          <div className="game-over-title"><h3>Game Over</h3></div>
          {<LeaderBoard userBoards={matchWinner} wordCount={props.game.words.length} />}
          <div  style={{display: 'flex', flexDirection: 'column'}}>
          <div><button className="multiplayer-lobby-buttons" onClick={props.playAgain}>Play again</button></div>
          <div><button className="multiplayer-lobby-buttons" onClick={props.joinPolySearch}>Join Polysearch</button></div>
          <div><button className="multiplayer-lobby-buttons" onClick={props.showMain}>Back to Main</button></div>
        </div>        
        </div>
        <div className="game-board-words-list">
          <HiddenWordsList 
            words={props.game.words} 
            foundWords={foundWords} 
            opponentFoundWords={opponentFoundWords}
          />
        </div>
      </div>
    </div>
  );
}