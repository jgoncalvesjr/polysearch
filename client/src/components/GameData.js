import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'
import TextField from '@material-ui/core/TextField'
import GameScoreBroadcast from './GameScoreBroadcast';
import './Chat.scss'

const socket = io.connect('http://localhost:3001')

export default function GameData(props) {

//const [state, setState] = useState({ score: ''})
const [gameData, setGameData] = useState({});

/* message types we are receiving
const dta = {
  'john' : {name:'john', score: 20},
  'dave': {name:'dave', score: 5}
}
dta['jane'] = {name:'jane', score: 20};
dta['jane'] = {name:'jane', score: 25};
const objArray = Object.keys(dta).map(key => {
  return dta[key];
});
console.log(objArray);
*/

  useEffect(() => {
    socket.on('gameData', ({ name, score }) => {
      const tmpData = {...gameData};
      tmpData[name] = { name, score };
      console.log("tmpData before", tmpData, typeof tmpData);
      //setGameData(...gameData, {name, score});
      setGameData(tmpData);
    })
  })

  console.log("gameData", gameData);
  const arrayGameData = Object.keys(gameData).map((obj_key, index) => {
    return <GameScoreBroadcast key={index} message={gameData[obj_key].score} user={gameData[obj_key].name} />
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

