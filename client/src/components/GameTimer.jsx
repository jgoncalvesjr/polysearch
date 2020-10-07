import React from "react";
import Timer from 'react-compound-timer';

import './GameTimer.scss';

export default function GameTimer(props){

  const getDurationMilis = () => {
    //expects mm:ss format
    console.log(props.duration);
    try{
      const arr = props.duration.split(':');
      let duration = parseInt(arr[0]) * 60000;
      duration += parseInt(arr[1]) * 1000;
      return duration;
    } catch(e){
      return 0;
    }
  }
  const durationTimer = getDurationMilis() > 0
    ?
    <Timer
      initialTime={getDurationMilis()}
      direction="backward"
      checkpoints={[
        {
            time: 0,
            //callback: () => alert('countdown finished'),
            callback: props.endGame
        }
      ]}        
    >
        {() => (
            <React.Fragment>
                <Timer.Minutes />:
                <Timer.Seconds /> 
            </React.Fragment>
        )}
    </Timer>
    :
    <Timer>
        <Timer.Hours />:
        <Timer.Minutes />:
        <Timer.Seconds />
    </Timer>    

  return(
    <div className='timer-container'>
      {durationTimer}  
    </div>     
  );
}