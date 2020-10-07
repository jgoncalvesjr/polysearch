import React from "react";

import './ChatLabel.scss'

export default function ChatLabel(props) {

  const userName = localStorage.getItem('username') ? localStorage.getItem('username') : localStorage.getItem('guestuser');

  return (
    props.name === userName 
    ? 
    <div className="chat-label-container">
      <div class="chat-label-avatar"><img src={props.avatar} alt="avatar" /></div>
      <div className="chat-label-text-container">
        <div className="chat-label-text-user">{props.name}</div>
        <div className="chat-label-text">{props.text}</div>
        <div class="time-right">{props.time}</div>
      </div>
    </div>    
    :   
    <div className="chat-label-container darker">
      <div className="chat-label-text-container">
        <div className="chat-label-text-user">{props.name}</div>
        <div className="chat-label-text">{props.text}</div>
        <div class="time-left">{props.time}</div>
      </div>
      <div class="chat-label-avatar"><img src={props.avatar} alt="avatar" /></div>
    </div>   
  );
}