import React from "react";
import useApplicationData from '../hooks/useApplicationData';
import Game from './Game';

export default function Application(props) {
  const {
    state,
    setDifficulty,
    getNewGame
  } = useApplicationData();

return (
    <Game getNewGame={getNewGame} game={state.game} />
  );

}