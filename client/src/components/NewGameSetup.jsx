import React, { Children } from "react";
import DifficultyButton from "./DifficultyButton";
//import useApplicationData from '../hooks/useApplicationData';
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
  }, 
  {
    id: 5,
    name: "Custom"
  }
];
export default function NewGameSetup(props) {
  
/*   const {
    state,
    setDifficulty,
  } = useApplicationData();
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
 const startGameButtonPost = function() {
  //e.preventDefault()
  console.log(`clicked start new game`)
  let currentUserId = localStorage.getItem('userId');
  return axios.post("http://localhost:3001/api/games", {
    
      host_id: currentUserId,
      multiplayer: false,
      mode: 'easy/test'

    
  }
  ).then(response => {
    console.log("start new game response", response);   
  })
  .catch(error => {
    console.log("registration error", error);
  })
};

/*
  End of post request to api/games
*/

let startGameButtonCombo = function() {
  props.startGame();
  startGameButtonPost();
};

  const dificultyButtonsArray = difficultySettings.map(el => {
  return <DifficultyButton 
          key={el.id} 
          name={el.name} 
          selected={el.name === props.difficulty} 
          onClick={props.setDifficulty}
        />
  });      
  console.log(dificultyButtonsArray);  
  return (
    <div style={{width: '90%'}}>
      <div style={{textAlign: 'center'}}><h2 style={{color: '#2371A9', width: '100%', margin: '10px 0px 0px 0px'}}>New Game</h2></div>
      <div style={{width: '100%', textAlign: 'right', color:'#2371A9'}}><span>Profile</span></div>
      <div style={{display:'flex', flexDirection: 'row', color:'#2371A9'}}>
        <div>
          <input type="radio" id="single-player" name="gameType" value="single-player" />
          <label for="single-player">Single Player</label>
        </div>
        <div>
          <input type="radio" id="multi-player" name="gameType" value="multi-player" />
          <label for="multi-player">Multi Player</label>
        </div>       
      </div>
      <div>
        {dificultyButtonsArray}
      </div>
      <div style={{display: 'flex', flexDirection: 'row', color: '#2371A9'}}>
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
      </div>
      <div style={{display: 'flex', flexDirection: 'row'}}>
        <div style={{display: 'flex', flexDirection: 'row'}}>
          <div>Game Mode</div>
          <div><button>Chill</button></div>
        </div>
        <div><input value="06:00" /></div>
      </div>
      <div  style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
        <div><button onClick={startGameButtonCombo}>Start Game</button></div>
        <div><button>Cancel</button></div>
      </div>
    </div>
  );
}