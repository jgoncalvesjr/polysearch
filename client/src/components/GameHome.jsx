import React from "react";

import './GameHome.scss';

export default function GameHome(props) {
    return (
   <main className="main-page">
     <div className="transparent-box" id="main-box">
      <h1>Current User</h1>
      <h2 id="main-page-title">PolySearch</h2>
        <div className="game-buttons-div">
          <button className="game-buttons" onClick={props.newGame}>New Game</button>
          <button className="game-buttons" onClick={props.joinGame}>Join Game</button>
          <button className="game-buttons" onClick={props.resumeGame}>Resume Game</button>
        </div>

      </div>
  </main> 
  );
}