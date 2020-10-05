import React/*, { Fragment, useEffect, useState }*/ from 'react';
//import { useParams } from 'react-router-dom';
//import axios from 'axios';
import './GameLobby.scss';

export default function GameLobby(props) {

/*   const { gameid } = useParams();
  console.log(gameid);
  
  const [dataNew, setDataNew] = useState({}); */

  
  // buttons for the game lobby page.
  function startGameButton() {
   //alert('You pressed the Start Game Button!');
   props.startMultiPlayerGame();
  };

  function mainMenuButton() {
    //document.location.href = "/";
    props.cancelScreen();
  };

  // Variable for storing the data from the axios request.
  //let dataRetrieved = [];

/*   useEffect(() => {
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
 */
/*   console.log('here is the actual data', dataNew)

  // will need to know the host to show/hide the start game button.
  const hostOfGame = dataNew.host_id;
  console.log('host of the game is: ', hostOfGame);
*/
  // will need to know the host to show/hide the start game button.
  //const hostOfGame = dataNew.host_id;
  //console.log('host of the game is: ', props.hostOfGame);

  // will need to get the current user to see if the id matches the hostid
  const currentUserId = parseInt(localStorage.getItem('userId'));
  console.log('current user id is: ', currentUserId);
/*
  // game id from the axios call.
  const gameId = dataNew.id; */
  let languages;
  if (props.languages) {
    languages = props.languages.map(el => {
      return <div>{el}</div>;
    });
  }
  return (
  <div id="multiplayer-lobby">
  <div id="multiplayer-lobby-box">
    <h2 id="multiplayer-lobby-title">Multiplayer Pre-Game Lobby</h2>
    <div id="">List of Players Go Here</div>
    <h3 id="lobby-url">Use this link to invite people to play: {props.link}</h3>
    <div>
      <h3>Difficulty: {props.difficulty} </h3>
      <h3>Game Mode: {props.gameMode} </h3>
      <h3>Duration: {props.duration}</h3>
      <h3>Languages:</h3>
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>{languages}</div>
    </div>
    {/* <h3>{props.languages}</h3> */}
    <div id='multiplayer-lobby-button-group'>
      { currentUserId === props.hostOfGame &&
      <button className="multiplayer-lobby-buttons" onClick={startGameButton}>Start Game</button>}
      <button className="multiplayer-lobby-buttons" onClick={mainMenuButton}>Cancel</button>
    </div>
  </div>
</div> 
  )
  
}
