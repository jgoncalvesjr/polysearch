import React from 'react';
import './GameLobby.scss';

export default function GameLobby(props) {

  function startGameButton() {
   props.startMultiPlayerGame();
  };

  function mainMenuButton() {
    props.cancelScreen();
  };

  // will need to get the current user to see if the id matches the hostid
  const currentUserId = parseInt(localStorage.getItem('userId'));
  let languages;
  if (props.languages) {
    languages = props.languages.map(el => {
      return <span key={el} className="game-lobby-languages" >{el}&nbsp;&nbsp;</span>
    });
  }

  return (
    <div className="game-lobby-container">
    <h2 className="multiplayer-lobby-title">Multiplayer Pre-Game Lobby</h2>
    
    <h3 id="lobby-url">Use this link to invite people to play: {props.link}</h3>
    <div>
      <h3>Difficulty: {props.difficulty} </h3>
      <h3>Game Mode: {props.gameMode} </h3>
      <h3>Duration: {props.duration}</h3>
      <div>
        <h3>Languages: {languages}</h3>
      </div>  
    </div>
    <div id='multiplayer-lobby-button-group'>
      { currentUserId === props.hostOfGame &&
      <button className="multiplayer-lobby-buttons" onClick={startGameButton}>Start Game</button>}
      <button className="multiplayer-lobby-buttons" onClick={mainMenuButton}>Cancel</button>
    </div>
  </div>
  )
  
}
