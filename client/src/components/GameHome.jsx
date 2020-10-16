import React from "react";

import './GameHome.scss';

export default function GameHome(props) {

  function loginButton() {
    document.location.href = "/login";
  };

  function registrationButton() {
    document.location.href = "/registration";
  };

  // this only changes the local storage username and userId, it doesn't change the loggedUser state from the App.js file.
  function logoutButton() {
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    document.location.href = "/";
  }

  function profileButton() {
    document.location.href = "/profile";
  }
  return (
  <main>
    <div>
    <h1 className="main-page-title">PolySearch</h1>
    <h3 className="main-page-title">Your Polyglot Word Search Game!</h3>
      <div className="game-buttons-div">
        <button className="game-buttons" onClick={props.newGame}>New Game</button>
        {!localStorage.getItem('username') &&
        <button className="game-buttons" onClick={loginButton}>Login</button>}
        
        {localStorage.getItem('username') &&
        <button className="game-buttons" onClick={profileButton}>Profile</button>
        }
        
        {localStorage.getItem('username') &&
        <button className="game-buttons" onClick={logoutButton}>Logout</button>
        }
        
        {!localStorage.getItem('username') &&
        <button className="game-buttons" onClick={registrationButton}>Join PolySearch</button>}
      </div>

    </div>
</main> 
);
}