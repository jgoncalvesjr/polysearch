import React from 'react';
import logo from './logo.svg';
import './App.scss';
import useApplicationData from './hooks/useApplicationData';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link, Redirect
} from "react-router-dom";
import NewGameSetup from "./components/NewGameSetup";

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Main Page</Link>
            </li>
            <li>
              <Link to="/multiplayer-lobby">Multiplayer Lobby</Link>
            </li>
            <li>
              <Link to="/game-over">Game Over</Link>
            </li>
            <li>
              <Link to="/newgame">New Game</Link>
            </li>            
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/multiplayer-lobby">
            <MultiplayerLobby />
          </Route>
          <Route path="/game-over">
            <GameOver />
          </Route>
          <Route path="/newgame">
            <NewGame />
          </Route>          
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return (
   <main className="main-page" id="main-page-id">
     <div className="transparent-box" id="main-box">
       
       <h2 id="main-page-title">PolySearch</h2>
      
        <div className="game-buttons-div">
          <button className="game-buttons" onClick={newGameButton}>New Game</button>
          <button className="game-buttons" onClick={joinGameButton}>Join Game</button>
          <button className="game-buttons" onClick={resumeGameButton}>Resume Game</button>
        </div>

      </div>


  </main> 
  );
}

function GameOver() {
  return (
    <main id="game-over">
      <div id="game-over-box">
        <h2 id="game-over-title">GAME OVER</h2>
        <div id="">Match Rankings Go Here</div>
        <div id='game-over-button-group'>
          <button className="game-over-buttons" onClick={playAgain}>Play Again</button>
          <button className="game-over-buttons" onClick={joinPolySearchButton}>Join PolySearch</button>
          <button className="game-over-buttons" onClick={mainMenuButton}>Back to Main Menu</button>
        </div>
      </div>
   </main> 
   );
}

function MultiplayerLobby() {
  return (
    <main id="multiplayer-lobby">
      <div id="multiplayer-lobby-box">
        <h2 id="multiplayer-lobby-title">Game Lobby</h2>
        <div id="">List of Players Go Here</div>
        <h3 id="lobby-url">Use this link to invite people to play! LINK HERE</h3>
        <div>
          <h3>Difficulty: </h3>
          <h3>Game Mode: </h3>
        </div>
        <div id='multiplayer-lobby-button-group'>
          <button className="multiplayer-lobby-buttons" onClick={startGameButton}>Start Game</button>
          <button className="multiplayer-lobby-buttons" onClick={mainMenuButton}>Cancel</button>
        </div>
      </div>
   </main> 
  )
}

function NewGame() {
  return (
  <div className="gameMainContainer">
    <div className="dvGameBoardContainer">
      <div className="dvGameBoardContents">
      <NewGameSetup />
      </div>
    </div>
  </div>
  );
}
// Preliminary Button logic is below

// buttons for the main page.
function newGameButton() {
  document.location.href = "/newgame";
};

function joinGameButton() {
  alert('You pressed the join game button!');
};

function resumeGameButton() {
  alert('You pressed the resume game button!');
};

// buttons for the game over page.
function playAgain() {
  alert('You pressed the Play Again Button!');
};

function joinPolySearchButton() {
  alert('You Pressed the Join PolySearch Button!');
};

function mainMenuButton() {
  document.location.href = "/";
};

// buttons for the game lobby page.
function startGameButton() {
  alert('You pressed the Start Game Button!');
};

function cancelButton() {
  alert('You Pressed the Cancel Button!');
};
