import React from "react";
import DifficultyButton from "./DifficultyButton";
import "./DifficultyButton.scss";

export default function NewGameBackBoard() {
  
  const difficultySelected = caption => {
    alert(`Selected ${caption}`);
  }
  
  const dificultyButtonsArray = [{caption: "Easy", selected: true}, {caption: "Medium", selected: false},
  {caption: "Hard", selected: false}, {caption: "Expert", selected: false}, 
  {caption: "Custom", selected: false}].map(el => {
  return <DifficultyButton 
          key={el.caption} 
          caption={el.caption} 
          selected={el.selected} 
          onClick={difficultySelected}
        />
  });      
  console.log(dificultyButtonsArray);  
  const boxStyle = {width: '60%', borderRadius: "10px", backgroundColor: "#FFF", opacity:0.70, border: '1px solid #000000', 
    margin: 'auto',
    padding: '0px 10px 10px 10px'
  };

  return (
    <div style={boxStyle}>
      <div style={{textAlign: 'center'}}><h2 style={{color: '#2371A9', width: '100%'}}>New Game</h2></div>
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
      <div style={{width: '65%'}}>
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