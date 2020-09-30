import React, { Children } from "react";
import DifficultyButton from "../DifficultyButton";
import NewGameSetup from '../NewGameSetup';
import GameBoard  from '../GameBoard';
import useVisualMode from "../../hooks/useVisualMode";

const SETUP = "SETUP";
const NEWGAME = "NEWGAME";
export default function Game(props) {
  console.log("props", props);
  const {mode, setMode, difficulty, setDifficulty} = useVisualMode(SETUP);

  const startGame = () => {
    //alert("get new game from server");
    props.getNewGame()
    .then(() => {
      setMode(NEWGAME)
    })
    .catch(error => {
      //should print error on label on screen
    })
  };

  return(
    <div>
      {mode === SETUP && <NewGameSetup 
        startGame={startGame} 
        difficulty={difficulty} 
        setDifficulty={setDifficulty} 
      />}
      {mode === NEWGAME && <GameBoard game={props.game}/>}
    </div>
  );
}