import React, { Children } from "react";
import DifficultyButton from "./DifficultyButton";
import useApplicationData from '../hooks/useApplicationData';

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
export default function NewGameSetup() {
  
  const {
    state,
    setDifficulty,
  } = useApplicationData();

  const dificultyButtonsArray = difficultySettings.map(el => {
  return <DifficultyButton 
          key={el.id} 
          name={el.name} 
          selected={el.name === state.difficulty} 
          onClick={setDifficulty}
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
        <div><button>Start Game</button></div>
        <div><button>Cancel</button></div>
      </div>
    </div>
  );
}