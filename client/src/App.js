import React from 'react';
import logo from './logo.svg';
import './App.scss';
import useApplicationData from './hooks/useApplicationData';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import NewGameSetup from "./components/NewGameSetup";

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
            <li>
              <Link to="/newgame">New Game</Link>
            </li>            
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Users />
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
    <h2>PolySearch</h2>

    <div className="game-buttons-div">
      <button className="game-buttons">New Game</button>
      <button className="game-buttons">Join Game</button>
      <button className="game-buttons">Resume Game</button>
    </div>

  </main> 
  );
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return (
  <div>
    <h2>Users</h2>
    
  </div>
  
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