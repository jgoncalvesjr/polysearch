import React, { Children, useState } from "react";
import DifficultyButton from "./DifficultyButton";
import './NewGameSetup.scss';

const difficultySettings = [
  {
    id: 1,
    name: "Easy"
  }, 
  {
    id: 2,
    name: "Medium"
  },
  {
    id: 3,
    name: "Hard"
  }, 
  {
    id: 4,
    name: "Expert"
  } 
  // {
  //   id: 5,
  //   name: "Custom"
  // }
];
export default function NewGameSetup(props) {
  // handler for multiplayer radio button
  const handleMultiplayerToggle = (e) => {

    props.setMultiplayer(e.target.value === 'true');
  }; 
const onChangeGameTime = (evt) => {
  props.setGameDuration(evt.target.value);
};

  const dificultyButtonsArray = difficultySettings.map(el => {
  return <DifficultyButton 
          key={el.id} 
          name={el.name} 
          selected={el.name === props.difficulty} 
          onClick={props.setDifficulty}
        />
  });  
  
  const multiPlayerChecked = props.multiplayer ? "checked" : '';
  const singlePlayerChecked = props.multiplayer ? '' : 'checked';
  return (
    <div className="game-setup-container">
      <div className="game-setup-title-container"><h2 className='game-setup-title'>New Game</h2></div>
      <div className='game-setup-options'>
        {!localStorage.userId &&
          // If no user logged in, only single player available
          <h3>Please Log in to host a multiplayer game!</h3>
        }
        {localStorage.userId &&
          
          <div className='game-setup-radio-buttons'>
            <div>
            {props.multiplayer 
              ? <input type="radio" id="single-player" name="gameType" value={false} onChange={handleMultiplayerToggle} />
              : <input type="radio" id="single-player" name="gameType"  checked={singlePlayerChecked} value={false} onChange={handleMultiplayerToggle} />
            }
            <label className="player-mode-select" htmlFor="single-player">Single Player&nbsp;&nbsp;&nbsp;&nbsp;</label>
            </div>
            {props.multiplayer 
              ? <input type="radio" id="multi-player" name="gameType" value={true} checked={multiPlayerChecked} onChange={handleMultiplayerToggle} />
              :  <input type="radio" id="multi-player" name="gameType" value={true} onChange={handleMultiplayerToggle} />
            }
            <label className="player-mode-select" htmlFor="multi-player">Multi Player</label>
          </div>              
        
        }
        <div>
          {dificultyButtonsArray}
        </div>
        <div className="durationContent">
            <div>Duration</div>         
          <div><input className="timer-input" value={props.duration} onChange={onChangeGameTime}/></div>
        </div>
      </div>
      <div className='setup-buttons'>
      { props.multiplayer 
      ?  <div><button className="game-buttons" onClick={props.startGame}>Create Game</button></div>
      :  <div><button className="game-buttons" onClick={props.startGame}>Start Game</button></div>
      }
        <div><button className="game-buttons" onClick={props.cancelScreen}>Cancel</button></div>
      </div>
    </div>
  );
}