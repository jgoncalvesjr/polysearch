import React from "react";
import useApplicationData from '../hooks/useApplicationData';
import Game from './Game';
import Chat from './Chat';
import io from 'socket.io-client'
const socket = io.connect('http://localhost:3001')

export default function Application(props) {
  const {
    state,
    setDifficulty,
    getNewGame
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


return (
    <div>
    <Game getNewGame={getNewGame} game={state.game} />
    <Chat loggedUser={loggedUser} />

    </div>

  );

}