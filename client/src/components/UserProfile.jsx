import React, { Fragment, useState, useReducer, useEffect } from 'react';
import axios from 'axios';

export default function UserProfile(props) {

  const userId = localStorage.userId;
  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState('');
  const [games, setGames] = useState([]);

  useEffect(() => {
    console.log(userId);
    axios({
      method: 'GET',
      url: `/api/users/${userId}`
    }).then(({ data }) => {
      console.log(data);
      setUsername(data.username);
      setAvatar(data.avatar);
      setGames(data.games);
    })
      .catch(err => console.log(err));
  }, []);

  const gameList = games.map(game => (
    <li key={game.link}>
      {game.link} {game.mode} {game.multiplayer && <span>multiplayer</span>}
    </li>
  ));

  return (
    
    <main className="main-page" id="main-page-id">
      <div className="transparent-box" id="profile-box">
       <h1>{username}'s Profile</h1>
       <img src={avatar}></img>
       <ul>{gameList}</ul>
 
       </div>
 
 
   </main> 
   );
  
}