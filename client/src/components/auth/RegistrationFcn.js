import React, { useState } from 'react';
import axios from "axios";
import {useHistory} from 'react-router-dom';

export default function RegistrationFcn(props) {
  const history = useHistory()
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [username, setUsername] = useState('');
  // const [avatar, setAvatar] = useState('');
  // const [registrationErrors, setRegistrationErrors] = useState('');

  // handleChange for email input field.
  const handleEmailInput = e => {
    props.setEmail(e.target.value);
  };
  // handleChange for password input field.
  const handlePasswordInput = e => {
    props.setPassword(e.target.value);
  };
  // handleChange for username input field.
  const handleUsernameInput = e => {
    props.setUsername(e.target.value);
  };
  // handleChange for avatar input field.
  const handleAvatarInput = e => {
    props.setAvatar(e.target.value);
  };

  // handling the submit button.
  const registerButton = (e) => {
    e.preventDefault()
    console.log(`clicked`)
    return axios.post("http://localhost:3002/register", {
      
        email: props.email,
        password: props.password,
        username: props.username,
        avatar: props.avatar,
        multiplayerWins: 0
      
    }
    ).then(response => {
      console.log("registration response", response);
      localStorage.setItem('username', response.data.username)
      props.setLoggedUser(response.data.username)
      history.push('/')
    })
    .catch(error => {
      console.log("registration error", error);
    })
  }
  

  return (
    <div>
    <form onSubmit={registerButton}>
      <input 
      type="email"
      name="email" 
      placeholder="Email" 
      value={props.email} 
      onChange={handleEmailInput} 
      required />

      <input 
      type="password"
      name="password" 
      placeholder="Password" 
      value={props.password} 
      onChange={handlePasswordInput} 
      required />

      <input 
      type="username"
      name="username" 
      placeholder="Username" 
      value={props.username} 
      onChange={handleUsernameInput} 
      required />

      <input 
      type="avatar"
      name="avatar" 
      placeholder="Avatar" 
      value={props.avatar} 
      onChange={handleAvatarInput}
      /> 

      <button type="submit" >Register</button>

    </form>
  </div>
  );



};

