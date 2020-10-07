import React, { Children } from "react";
import DifficultyButton from "./DifficultyButton";
import NewGameSetup from './NewGameSetup';
//import useApplicationData from '../hooks/useApplicationData';
import GridRow from "./GridRow";
import GameScore from './GameScore';
import GameTimer from './GameTimer';
import HiddenWordsList from './HiddenWordsList';

import './GameBoard.scss';
import './GameLobby.scss';

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

  // testing a way to get the score for each player and declare a winner at the end of the game.
/*   let matchWinner = []
  socket.emit('gameData', {HostedGameId:'game-over', name:localStorage.getItem('username'), score: localStorage.getItem('score')});
  
  useEffect
  socket.on('gameData', ({HostedGameId,  name, score}) => {
    console.log(`Here is the socket info call at the end of the game: gameId: ${HostedGameId} name:${name} score: ${parseInt(score)}`);
    if(!score){
      score=0
    }
    matchWinner.push({name, score: parseInt(score)})
  });   */

  /* keep
  console.log('Match Winner array before local users info: ', matchWinner )// shows the other guys object with their name/score

  
  const localScore = localStorage.getItem('score') ? parseInt(localStorage.getItem('score')) : 0;
  matchWinner.push({name:localStorage.getItem('username'), score: localScore });

  console.log('here is the match winner array with both players in objects: ', matchWinner);
*/
  // props.matchWinner.sort((obj1, obj2) => {
  //   return obj1.score  - obj2.score;
  // });
//console.log('here is the match winner array after being sorted: ', matchWinner);

  return (
    <div>
      <div className="game-board-score-container">
        <GameScore score={props.score} wordCount={props.game.words.length} />
        {/*<GameTimer  duration={props.duration} endGame={props.endGame} multiplayer={props.multiplayer} />*/}
      </div>

      <div className="game-board-grid">
        <div className='board-table'>
          {/*{gameGrid}*/}
          <div className="game-over-title"><h3>Game Over Match Winner: </h3></div>
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
          />
        </div>
      </div>
    </div>
  );
}