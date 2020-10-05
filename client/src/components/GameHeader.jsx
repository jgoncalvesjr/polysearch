import React from "react";
import GameScore from './GameScore';
import GameTimer from './GameTimer';

import './GameHeader.scss';

export default function GameHeader(props) {
  
  return(
    <div className='game-header'>
      <GameScore score={props.score} />
      <GameTimer duration={duration} />
    </div>
  );
}