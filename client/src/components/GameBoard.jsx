import React, { Children } from "react";
import DifficultyButton from "./DifficultyButton";
import NewGameSetup from './NewGameSetup';
import useApplicationData from '../hooks/useApplicationData';

export default function GameBoard(props) {

  const {
    state,
    setDifficulty,
    getNewGame,
  } = useApplicationData();

  return (
    <div>{props.game}</div>
  );
}