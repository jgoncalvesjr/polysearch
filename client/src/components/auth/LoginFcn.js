import React, { useState } from 'react';
import axios from "axios";

export default function LoginFcn() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loginErrors, setLoginErrors] = useState('');

  // handleChange for email input field.
  const handleEmailInput = e => {
    setEmail(e.target.value);
  };
  // handleChange for password input field.
  const handlePasswordInput = e => {
    setPassword(e.target.value);
  };

  // handling the submit button.
  const loginButton = () => {
    axios.post("http://localhost:3002/login",{
      email: email,
      password: password
      }
      ).then(response => {
        console.log("login response: ", response)
        setUsername(response.data.result.username)
        //localStorage.setItem('username', response.data.username)
      })
      .catch(error => {
        console.log("login error", error);
      });
  };
  

  return (
    <div>
    <form onSubmit={loginButton}>
      <input 
      type="email"
      name="email" 
      placeholder="Email" 
      value={email} 
      onChange={handleEmailInput} 
      required />

      <input 
      type="password"
      name="password" 
      placeholder="Password" 
      value={password} 
      onChange={handlePasswordInput} 
      required />

      <button type="submit" >Login</button>
    </form>
  </div>
  );

};

