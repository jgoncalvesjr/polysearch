import React from "react";

import './GameHome.scss';

export default function GameHome(props) {

  // button for login
  function loginButton() {
    document.location.href = "/login";
  };

    // button for registration
    function registrationButton() {
      document.location.href = "/registration";
    };
    // style={{display: 'block', border: '1px solid green', height: '200px'}}
    return (
    <main>
     <div>
      <h1 className="main-page-title">PolySearch</h1>
      <h3 className="main-page-title">Your Polyglot Word Search Game!</h3>
        <div className="game-buttons-div">
          <button className="game-buttons" onClick={props.newGame}>New Game</button>
          {!localStorage.getItem('username') &&
          <button className="game-buttons" onClick={loginButton}>Login</button>}
          
          {!localStorage.getItem('username') &&
          <button className="game-buttons" onClick={registrationButton}>Join PolySearch</button>}
        </div>

      </div>
  </main> 
  );
}