import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'
import TextField from '@material-ui/core/TextField'
import GameScoreBroadcast from './GameScoreBroadcast';
import './Chat.scss'

const socket = io.connect('http://localhost:3001')

export default function GameData(props) {

//const [state, setState] = useState({ score: ''})
const [gameData, setGameData] = useState([])

/* message types we are receiving
message {name, message}
gameData {name, score}

score = solved.length / game.words.length
*/
  useEffect(() => {
    socket.on('gameData', ({ name, score }) => {
      setGameData([...gameData, { name, score }])
    })
  })

  const arrayGameData = gameData.map((el, index) => {
    return <GameScoreBroadcast key={index} message={el.score} user={localStorage.getItem('username')} />
  });
/*   const renderChat = () => {
    return chat.map(({ name, gameData }, index) => (
      <div key={index}>
        <h3>
          {name}: <span>{gameData}</span>
        </h3>
      </div>
    ))
  } */

return (
  <div style={{display:'flex', flexDirection: 'column', color:'#2371A9'}}>
    <div><h3>Game Data</h3></div>
    {arrayGameData}
  </div>

)

}