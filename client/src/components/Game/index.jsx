//import React, { Children } from "react";
import React from "react";
import DifficultyButton from "../DifficultyButton";
import NewGameSetup from '../NewGameSetup';
import GameBoard  from '../GameBoard';
import GameOverBoard from '../GameOverBoard';
import useVisualMode from "../../hooks/useVisualMode";
import HiddenWordsList from "../HiddenWordsList";

import GameLobby from "../GameLobby";
import GameHome from "../GameHome";
import Chat from "../Chat";
import io from 'socket.io-client'
const socket = io.connect('http://localhost:3001')

const HOME = "HOME";
const SETUP = "SETUP";
const NEWGAME = "NEWGAME";
const ENDGAME = "ENDGAME";
const GAMELOBBY = "GAMELOBBY";

const LEFT = "LEFT";
const RIGHT = "RIGHT";
const UP = "UP";
const DOWN = "DOWN";
const DIAGANOL_LEFT_UP = "DIAGANOL_LEFT_UP";
const DIAGANOL_LEFT_DOWN = "DIAGANOL_LEFT_DOWN";
const DIAGANOL_RIGHT_UP = "DIAGANOL_RIGHT_UP";
const DIAGANOL_RIGHT_DOWN = "DIAGANOL_RIGHT_DOWN";


export default function Game(props) {
    const {
      mode, 
      transition, 
      back, 
      reset,
      difficulty, 
      setDifficulty, 
      attempts, 
      addAttempt, 
      solved, 
      SetCurrentSolved, 
      multiplayer, 
      setMultiplayer, 
      gameId, 
      setGameId, 
      hostId, 
      setHostId,
      duration,
      setDuration,
      broadcastScore,
      setBroadcastScore,
      score      
    } = useVisualMode(HOME);

    const checkSolved = () => {
    if (attempts.length === 0) {
      return;
    }
    //go through current attempts and see if it match any words on the board
    const WordArray = attempts.map(el => {
      return props.game.rows[el.row][el.col];
    })
    let word = WordArray.join('');
    let found = props.game.words.find(gameWord => word === gameWord.word.toUpperCase());
    if (found) {
      SetCurrentSolved();
      console.log("emit score");
      socket.emit('gameData', {name:localStorage.getItem('username'), score: `${localStorage.getItem('score')} / ${props.game.words.length}`});
      return;
    }
    word = WordArray.reverse().join('');
    found = props.game.words.find(gameWord => word === gameWord.word.toUpperCase());
    if (found) {
      SetCurrentSolved();
      console.log("Reverse emit score");
      socket.emit('gameData', {name:localStorage.getItem('username'), score: `${localStorage.getItem('score')} / ${props.game.words.length}`});
      return;
    }    
  };

  const cancelScreen = () => {
    back();
  };
  const newGame = () => {
    transition(SETUP);
  };

  const joinGame = () => {
    alert("join game");
  };

  const resumeGame = () => {
    alert("resume game");
  };  
    // this function is passed down to the NewGameSetup functional component Start Game button.
  const startGame = () => {
    //alert("get new game from server");
    props.getNewGame(multiplayer, difficulty) //if multiplayer, need to send game id.
    .then(({hostId, link, difficultyLevel, bolMultiplayer}) => {
      setHostId(hostId);
      setGameId(link);
      if(multiplayer) {
        transition(GAMELOBBY);
      } else {
        transition(NEWGAME)
      }
    })
    .catch(error => {
      //should print error on label on screen
    })
  };
  const startMultiPlayerGame = () => {
    props.startMultiplayerGame(gameId) 
    .then(({hostId, link, difficultyLevel, bolMultiplayer}) => {
      setHostId(hostId);
      setGameId(link);  
      setDifficulty(difficultyLevel); 
      setMultiplayer(bolMultiplayer);   
      transition(NEWGAME)
    })
    .catch(error => {
      //should print error on label on screen
    })
  };
  const playAgain = () => {

  };
  const joinPolySearch = () => {

  };
  const showMain = () => {
    reset(HOME);
  };
  // =====================================================
  const validateMove = (row, col, direction) => {
    if (direction === LEFT) {
        for (let i = 0; i < attempts.length; i++) {
            const id = `${row}-${col - (i + 1)}`;
            if (id !== attempts[attempts.length - (i +1)].id)
                return false;
        }
        return true;
    }
    if (direction === RIGHT) {
        for (let i = 0; i < attempts.length; i++) {
            const id = `${row}-${col + (i + 1)}`;
            if (id !== attempts[attempts.length - (i +1)].id)
                return false;
        }
        return true;        
    }
    if (direction === UP) {
        for (let i = 0; i < attempts.length; i++) {
            const id = `${row - (i + 1)}-${col}`;
            if (id !== attempts[attempts.length - (i +1)].id)
                return false;
        }
        return true;        
    } 
    if (direction === DOWN) {
        for (let i = 0; i < attempts.length; i++) {
            const id = `${row + (i + 1)}-${col}`;
            if (id !== attempts[attempts.length - (i +1)].id)
                return false;
        }
        return true;        
    }
    if (direction === DIAGANOL_LEFT_UP) {
        for (let i = 0; i < attempts.length; i++) {
            const id = `${row - (i + 1)}-${col - (i + 1)}`;
            if (id !== attempts[attempts.length - (i +1)].id)
                return false;            
        }
        return true; 
    }
    if (direction === DIAGANOL_LEFT_DOWN) {
        for (let i = 0; i < attempts.length; i++) {
            const id = `${row  + (i + 1)}-${col - (i + 1)}`;
            if (id !== attempts[attempts.length - (i +1)].id)
                return false;            
        }
        return true; 
    }    
    if (direction === DIAGANOL_RIGHT_UP) {
        for (let i = 0; i < attempts.length; i++) {
            const id = `${row  - (i + 1)}-${col + (i + 1)}`;
            if (id !== attempts[attempts.length - (i +1)].id)
                return false;            
        }
        return true; 
    }     
    if (direction === DIAGANOL_RIGHT_DOWN) {
        for (let i = 0; i < attempts.length; i++) {
            const id = `${row  + (i + 1)}-${col + (i + 1)}`;
            if (id !== attempts[attempts.length - (i +1)].id)
                return false;            
        }
        return true; 
    } 
    return false;
  }
  const connectMoves = id => {
    const [row, col] = id.split('-').map(function(el){
        return parseInt(el);
    });
    if (attempts.length == 0) {
        addAttempt(id, row, col);
        return;
    }
    if (validateMove(row, col, LEFT)
      || validateMove(row, col, RIGHT)
      || validateMove(row, col, UP)
      || validateMove(row, col, DOWN)
      || validateMove(row, col, DIAGANOL_LEFT_UP)
      || validateMove(row, col, DIAGANOL_LEFT_DOWN)
      || validateMove(row, col, DIAGANOL_RIGHT_UP)
      || validateMove(row, col, DIAGANOL_RIGHT_DOWN)) {
        addAttempt(id, row, col);
      } else { //Not valid. start new attempts
        addAttempt(id, row, col, true);
      } 
  }

  const selectGameContent = id => {
    connectMoves(id);
  };

  const endGame = () => {
    transition(ENDGAME);
  };
  
  const setGameDuration = time => {
    setDuration(time);
  };

  checkSolved();
/*   if(broadcastScore) {
    socket.emit('gameData', {name:localStorage.getItem('username'), score: `${score} / ${props.game.words.length}`});
    setBroadcastScore(false);
  } */
  //<GameTimer gametime={gametime} endGame={endGame} multiplayer={props.multiplayer} />
  return(
    <div>
      {mode === HOME && <GameHome 
        newGame={newGame}
        joinGame={joinGame}
        resumeGame={resumeGame}
      />}
      {mode === SETUP && <NewGameSetup 
        startGame={startGame} 
        cancelScreen={cancelScreen}
        difficulty={difficulty} 
        setDifficulty={setDifficulty} 
        multiplayer={multiplayer}
        setMultiplayer={setMultiplayer}
        duration={duration}
        setGameDuration={setGameDuration}
      />}
      {mode === GAMELOBBY && <GameLobby
        startMultiPlayerGame={startMultiPlayerGame}
        cancelScreen={cancelScreen}
        difficulty={difficulty}
        gameMode={'Chill'}
        hostOfGame={hostId}
        link={gameId}
      />}
      {mode === NEWGAME && <GameBoard 
        game={props.game}
        selectGameContent={selectGameContent}
        attempts={attempts}
        solved={solved}
        endGame={endGame}
        multiplayer={multiplayer}
        duration={duration}
      />}
      {mode === ENDGAME && <GameOverBoard 
        game={props.game}
        playAgain={playAgain}
        joinPolySearch={joinPolySearch}
        showMain={showMain}
        attempts={attempts}
        solved={solved}
        endGame={endGame}
        multiplayer={multiplayer}
        duration={duration}      
      />}
      {(mode ===  NEWGAME || mode === GAMELOBBY || mode === ENDGAME) &&
      <Chat loggedUser={localStorage.getItem('username')}/>

      }
    </div>
  );
}
