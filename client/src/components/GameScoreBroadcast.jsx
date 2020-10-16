import React from 'react';

export default function GameScoreBroadcast(props) {

  return(
  <div>
    <div>{props.user}</div>
    <div>{props.message} </div>
  </div>
  );
}