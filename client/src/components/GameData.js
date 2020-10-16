import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'
import TextField from '@material-ui/core/TextField'
import GameScoreBroadcast from './GameScoreBroadcast';
import './Chat.scss'

const socket = io.connect('http://localhost:3001')

export default function GameData(props) {

const [gameData, setGameData] = useState({});

  useEffect(() => {
    socket.on('gameData', ({ name, score }) => {
      const tmpData = {...gameData};
      tmpData[name] = { name, score };
      setGameData(tmpData);
    })
  })

  const arrayGameData = Object.keys(gameData).map((obj_key, index) => {
    return <GameScoreBroadcast key={index} message={gameData[obj_key].score} user={gameData[obj_key].name} />
  });

  return (
    <div style={{display:'flex', flexDirection: 'column', color:'#2371A9'}}>
      <div><h3>Game Data</h3></div>
      {arrayGameData}
    </div>
  );
}

