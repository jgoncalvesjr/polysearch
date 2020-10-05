import React, { Children, useState } from "react";
import DifficultyButton from "./DifficultyButton";
import './NewGameSetup.scss';
import axios from "axios";

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
  
/*   const {
    state,
    setDifficulty,
  } = useApplicationData();
 */
/* commented on Oct 3 2020
  const [multiplayer, setMultiplayer] = useState(false);
  const [difficultyLevel, setDifficultyLevel] = useState('');

  // handler for mode/difficultyLevel
  const handleDifficultyLevel = (e) => {
    setDifficultyLevel(e.target.value);
  }
*/

  /*
    For sending a post request to "/api/games"
    Must Send:
      -difficulty: string
      -hostId: current playerID
      -multiplayer: boolean

    Plan: 
    Current userId: On the register and login functions where the username is stored into the local storage, also store the user id.
    Save it to the local storage.

    multiplayer: pass down as prop

    difficulty: pass down as prop


  */
  // handler for multiplayer radio button
  const handleMultiplayerToggle = (e) => {

    props.setMultiplayer(e.target.value === 'true');
  }; 
/*  const startGameButtonPost = function() {
  //e.preventDefault()
  console.log(`clicked start new game`)
  let currentUserId = localStorage.getItem('userId');
  console.log('here is the currentuserid: ', currentUserId);
  return axios.put("http://localhost:3001/api/games", {
    
      host_id: currentUserId,
      multiplayer: multiplayer,
      mode: difficultyLevel

    
  }
  ).then(response => {
    console.log("start new game response", response);   
  })
  .catch(error => {
    console.log("start new game call error: ", error);
  })
};
 */
/*
  End of post request to api/games
*/

/* let startGameButtonCombo = function() {
    props.startGame();
    //startGameButtonPost();
   // document.location.href = `/${link}`;
}; */

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
  /*
        multiplayer={multiplayer}
        setMultiPlayer={setMultiPlayer}  
  */    
  console.log("multiplayer", props.multiplayer);  
  const multiPlayerChecked = props.multiplayer ? "checked" : '';
  const singlePlayerChecked = props.multiplayer ? '' : 'checked';
  return (
    <div className="game-setup-container">
      <div className="game-setup-title-container"><h2 className='game-setup-title'>New Game</h2></div>
      {/* <div style={{width: '100%', textAlign: 'right', color:'#2371A9'}}><span>Profile</span></div> */}
      <div className='game-setup-options'>
        <div className='game-setup-radio-buttons'>
              
          <div>
          {props.multiplayer 
            ? <input type="radio" id="single-player" name="gameType" value={false} onChange={handleMultiplayerToggle} />
            : <input type="radio" id="single-player" name="gameType"  checked={singlePlayerChecked} value={false} onChange={handleMultiplayerToggle} />
          }
            <label className="player-mode-select" for="single-player">Single Player</label>
          </div>
          <div>
          {props.multiplayer 
            ? <input type="radio" id="multi-player" name="gameType" value={true} checked={multiPlayerChecked} onChange={handleMultiplayerToggle} />
            :  <input type="radio" id="multi-player" name="gameType" value={true} onChange={handleMultiplayerToggle} />
          }
            <label className="player-mode-select" for="multi-player">Multi Player</label>
          </div>                  
        </div>    
        <div>
          {dificultyButtonsArray}
        </div>
        {/* <div style={{display: 'flex', flexDirection: 'row', color: '#2371A9'}}>
          <div>Select Language</div>
          <div>
            <select>
              <option>English</option>
              <option>French</option>
              <option>Spanish</option>
              <option>Italian</option>
              <option>Portuguese</option>
            </select>
          </div>
        </div> */}
        <div className="durationContent">
          
            <div>Duration</div>
            {/* <div><button>Chill</button></div> */}
          
          <div><input className="timer-input" value={props.duration} onChange={onChangeGameTime}/></div>
        </div>
      </div>
      <div className='setupButtons'>
      { props.multiplayer 
      ?  <div><button className="game-buttons" onClick={props.startGame}>Create Game</button></div>
      :  <div><button className="game-buttons" onClick={props.startGame}>Start Game</button></div>
      }
        <div><button className="game-buttons" onClick={props.cancelScreen}>Cancel</button></div>
      </div>
    </div>
  );
}