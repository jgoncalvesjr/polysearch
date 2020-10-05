import React, { Fragment, useState, useEffect } from 'react';
// import {useHistory} from 'react-router-dom';
import axios from 'axios';
import './UserProfile.scss';

export default function UserProfile(props) {

  // const history = useHistory();
  const userId = localStorage.userId;
  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState('');
  const [games, setGames] = useState([]);
  const [password, setPassword] = useState('');
  const [avatarUpdate, setAvatarUpdate] = useState('');

  useEffect(() => {
    console.log(userId);
    axios({
      method: 'GET',
      url: `/api/users/${userId}`
    }).then(({ data }) => {
      console.log(data);
      setUsername(data.username);
      setAvatar(data.avatar);
      setAvatarUpdate(data.avatar);
      setGames(data.games);
    })
      .catch(err => console.log(err));
  }, [userId]);

  const gameList = games.map(game => (
    <tr key={game.link}>
      <td>{game.link}</td>
      <td>{game.mode}</td> 
      {game.multiplayer ? <td>multiplayer</td> : <td>single player</td>}
    </tr>
  ));

  const handlePasswordInput = e => {
    setPassword(e.target.value);
  };

  const handleAvatarInput = e => {
    setAvatarUpdate(e.target.value);
  };

  const updateProfile = e => {
    e.preventDefault();
    console.log(`clicked`);
    console.log(password, avatarUpdate);
    return axios.put(`/api/users/${userId}`,{
      id: userId,
      password: password,
      avatar: avatarUpdate
      }
      ).then(response => {
        console.log("Update response: ", response);
        document.location.href = "/profile";
      })
      .catch(error => {
        console.log("Update error:", error);
      });
  };

  return (
    
    <main className="main-page" id="main-page-id">
      <div className="transparent-box" id="profile-box">
       <h1>{username}'s Profile</h1> <img className="avatar-image" src={avatar} alt="profile-avatar"></img>
       <h1>Your Games</h1>
       <h3>Share your multiplayer game link to play it again with other players!</h3>
       <table className="game-list-header">
       <thead>
         <tr>         
          <th>Link</th>
          <th>Difficulty</th>
          <th>Mode</th>
         </tr>
       </thead>
       <tbody>{gameList}</tbody>       
       </table>
       <form className="update-profile-form" onSubmit={updateProfile}>
        <h3>Update your profile</h3>
        <p>New password:</p>
        <input
        className="profile-input" 
        type="password"
        name="password" 
        placeholder="new password" 
        value={password} 
        onChange={handlePasswordInput} 
        required />
        <p>New avatar image:</p>
        <input 
        className="profile-input"   
        type="avatar"
        name="avatar" 
        placeholder="new avatar image URL" 
        value={avatarUpdate} 
        onChange={handleAvatarInput} 
        required />

      <br/><button type="submit" >Update Profile</button>
      </form>
      </div>

    </main> 
   );
  
}