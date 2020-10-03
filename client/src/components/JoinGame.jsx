import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function JoinGame(props) {

  const { gameid } = useParams();
  console.log(gameid);
  
  const [dataNew, setDataNew] = useState({});

  
  // buttons for the game lobby page.
  function startGameButton() {
    alert('You pressed the Start Game Button!');
  };

  function mainMenuButton() {
    document.location.href = "/";
  };

  // Variable for storing the data from the axios request.
  //let dataRetrieved = [];

  useEffect(() => {
    axios({
      method: 'GET',
      url: `/api/games/${gameid}`
    }).then(({ data }) => {
      console.log('Here is the data being retrieved: ',data);
      console.log('using the JoinGame functional component.')
      
      // trying to make the data from the axios get request retrievable by all everything.
      setDataNew(data);
    })
      .catch(err => console.log(err));
  }, [gameid]);

  console.log('here is the actual data', dataNew)

  // will need to know the host to show/hide the start game button.
  const hostOfGame = dataNew.host_id;
  console.log('host of the game is: ', hostOfGame);

  // will need to get the current user to see if the id matches the hostid
  const currentUserId = parseInt(localStorage.getItem('userId'));
  console.log('current user id is: ', currentUserId);

  // game id from the axios call.
  const gameId = dataNew.id;


  


  return (
  <main id="multiplayer-lobby">
  <div id="multiplayer-lobby-box">
    <h2 id="multiplayer-lobby-title">Multiplayer Game Lobby</h2>
    <div id="">List of Players Go Here</div>
    <h3 id="lobby-url">Use this link to invite people to play: {dataNew.link}</h3>
    <div>
      <h3>Difficulty: {dataNew.mode} </h3>
      <h3>Game Mode: </h3>
    </div>
    <div id='multiplayer-lobby-button-group'>
{ currentUserId === hostOfGame &&
      <button className="multiplayer-lobby-buttons" onClick={startGameButton}>Start Game</button>}
      <button className="multiplayer-lobby-buttons" onClick={mainMenuButton}>Cancel</button>
    </div>
  </div>
</main> 
  )
  
}
/*
Currently this page will get the 
 -difficulty 
 -game mode
Need to get it to display: 
  -the players that are currently in the game.
  - chat


  need to only show the start game button on this page if the currentUser is equal to the host.
*/