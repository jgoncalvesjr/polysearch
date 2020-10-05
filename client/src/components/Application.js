import React from "react";
import useApplicationData from '../hooks/useApplicationData';
import Game from './Game';

export default function Application(props) {
  const {
    state,
    setDifficulty,
    getNewGame,
    startMultiplayerGame
  } = useApplicationData();

return (
    <Game 
      getNewGame={getNewGame} 
      startMultiplayerGame={startMultiplayerGame}
      game={state.game} 
    />
  );

}