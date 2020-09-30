import React, { Children } from "react";
import DifficultyButton from "./DifficultyButton";
import NewGameSetup from './NewGameSetup';
import useApplicationData from '../hooks/useApplicationData';
import GridRow from "./GridRow";

import './GameBoard.scss';

export default function GameBoard(props) {

  const {
    state,
    setDifficulty,
    getNewGame,
  } = useApplicationData();

  const gameGrid = props.game.rows.map(row => {
    return <GridRow row={row} />
  });
  return (
    <div className='board-table'>
      {gameGrid}
    </div>
  );
}