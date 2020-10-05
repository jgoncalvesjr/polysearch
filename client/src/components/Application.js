import React from "react";
import useApplicationData from '../hooks/useApplicationData';
import Game from './Game';
import Chat from './Chat';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client'
const socket = io.connect('http://localhost:3001')

export default function Application(props) {
  const {
    state,
    setDifficulty,
    getNewGame,
    startMultiplayerGame
  } = useApplicationData();

  const loggedUser = localStorage.getItem('username')

  // socket.on('gameData', ({ gameData }) => {
  //   const gameDataTest= function () {
  //     console.log('hello test')
  //   }
  //   console.log('hello test')
  //   socket.send('hello test');
  //   socket.emit('gameData', { gameData })
  // })

//   socket.on('gameData', testWebSocket)
// const testWebSocket = () => {
//   socket.emit('gameData', 'hello')
// }

const { gameid } = useParams();
//const gameObj = <Game getNewGame={getNewGame} game={state.game} startMultiplayerGame={startMultiplayerGame} />
//gameid={gameid}
const GAMELOBBY = "GAMELOBBY";
return (
    <div>
      {gameid
      ? <Game getNewGame={getNewGame} game={state.game} startMultiplayerGame={startMultiplayerGame} mode={GAMELOBBY} gameid={gameid} />
      : <Game getNewGame={getNewGame} game={state.game} startMultiplayerGame={startMultiplayerGame} />
      }    
    </div>

  );

}