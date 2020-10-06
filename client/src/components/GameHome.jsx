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

    // a function for the logout button
    // this only changes the local storage username and userId, it doesn't change the loggedUser state from the App.js file.
    function logoutButton() {
      localStorage.removeItem('username');
      localStorage.removeItem('userId');
      //setLoggedUser('')
      document.location.href = "/login";
    }

    function profileButton() {
      document.location.href = "/profile";
    }
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