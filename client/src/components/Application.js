import React from "react";
import useApplicationData from '../hooks/useApplicationData';
import Game from './Game';
import Chat from './Chat';
import { useParams } from 'react-router-dom';

export default function Application(props) {
  const {
    state,
    setDifficulty,
    getNewGame,
    startMultiplayerGame,
    sendSocketData
  } = useApplicationData();

  const loggedUser = localStorage.getItem('username')
  const { gameid } = useParams();
  return (
    <div>
      <Game getNewGame={getNewGame} game={state.game} startMultiplayerGame={startMultiplayerGame} sendSocketData={sendSocketData} gameLink={gameid ? gameid : ''} />
    </div>
  );
}