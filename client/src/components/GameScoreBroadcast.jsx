import React from 'react';
import io from 'socket.io-client'
const socket = io.connect('http://localhost:3001')

export default function GameScoreBroadcast(props) {

  return(
  <div>
    <div>{props.user}</div>
    <div>{props.message} </div>
  </div>
  );
}