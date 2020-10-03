//import React, { Children } from "react";
import React from "react";
import DifficultyButton from "../DifficultyButton";
import NewGameSetup from '../NewGameSetup';
import GameBoard  from '../GameBoard';
import useVisualMode from "../../hooks/useVisualMode";
import HiddenWordsList from "../HiddenWordsList";

const SETUP = "SETUP";
const NEWGAME = "NEWGAME";

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
      setMode, 
      difficulty, 
      setDifficulty, 
      attempts, 
      addAttempt, 
      clearAttempts, 
      solved, 
      SetCurrentSolved,
      multiplayer,
      setMultiplayer
    } = useVisualMode(SETUP);

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
      return;
    }
    word = WordArray.reverse().join('');
    found = props.game.words.find(gameWord => word === gameWord.word.toUpperCase());
    if (found) {
      SetCurrentSolved();
      return;
    }    
  };
    // this function is passed down to the NewGameSetup functional component Start Game button.
  const startGame = () => {
    //alert("get new game from server");
    props.getNewGame(multiplayer, difficulty)
    .then(() => {
      setMode(NEWGAME)
    })
    .catch(error => {
      //should print error on label on screen
    })
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
  checkSolved();
  //{/*currentUserId*/}
  return(
    <div>
      {mode === SETUP && <NewGameSetup 
        startGame={startGame} 
        difficulty={difficulty} 
        setDifficulty={setDifficulty} 
        multiplayer={multiplayer}
        setMultiplayer={setMultiplayer}
      />}
      {mode === NEWGAME && <GameBoard 
        game={props.game}
        selectGameContent={selectGameContent}
        attempts={attempts}
        solved={solved}
      />}
    </div>
  );
}