import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'
import TextField from '@material-ui/core/TextField'
import ChatLabel from './ChatLabel';
import {generateRandomGuestUser} from '../lib/avatarHelper';
import './Chat.scss'
import './GameLobby.scss'

const socket = io.connect('http://localhost:3001')

export default function Chat(props) {

const [state, setState] = useState({ message: ''})
const [chat, setChat] = useState([])

/* message types we are receiving
message {name, message}
gameData {name, score}

score = solved.length / game.words.length
*/
  useEffect(() => {
    socket.on('message', ({ name, message, avatar,  HostedGameId }) => {
      //should ignore message if gameId on message is not same as this gameId
      console.log("chat incomming", name, message, avatar,  HostedGameId);
      const localGameId = localStorage.getItem('gameId');
      console.log("localGameId", localGameId);
      if(localGameId.length > 0 && localGameId === HostedGameId) {
        const timeOptions = {hour: 'numeric', minute: 'numeric'}
        const chatTime = new Intl.DateTimeFormat('en-US', timeOptions).format(new Date());          
        setChat([...chat, { name, message, avatar, chatTime }])
      }
    })
  })

  const onTextChange = e => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const onMessageSubmit = e => {
    e.preventDefault();
    let name = props.loggedUser? props.loggedUser : localStorage.getItem('guestuser');
    let outgoingAvatar = localStorage.getItem('avatar');
    const outgoingGameId = localStorage.getItem('gameId');

    if(!name || !outgoingAvatar) {
      const guestUserObj = generateRandomGuestUser();
      if(!name) {
        name = `Guest${guestUserObj.handle}`;
        localStorage.setItem('guestuser', name);
      }
      if(!outgoingAvatar) {
        localStorage.setItem('avatar', guestUserObj.avatar);
        outgoingAvatar = guestUserObj.avatar
        console.log("outgoingAvatar", outgoingAvatar);
      }
    }
    const { message } = state
    socket.emit('message', { name, message, avatar:outgoingAvatar, HostedGameId:outgoingGameId})
    setState({ message: ''})
    const timeOptions = {hour: 'numeric', minute: 'numeric'}
    const chatTime = new Intl.DateTimeFormat('en-US', timeOptions).format(new Date());    
   
    setChat([...chat, { name, message, avatar:outgoingAvatar, chatTime }])
  }

/*   const renderChat = chat.map(({ name, message }, index) => (
      <div key={index}>
        <h3>
          {name}: <span>{message}</span>
        </h3>
      </div>
    )) */
    const renderChat = chat.map(({ name, message, avatar, chatTime }, index) => (
      <ChatLabel 
        key={index}
        name={name}
        text={message}
        avatar={avatar}
        time={chatTime}
      />
    ))    

return (
  <div className="card">
  <form onSubmit={onMessageSubmit}>
    <h1>Chat</h1>
    {/* <div className="name-field">
      <h2>Current User: {props.loggedUser}</h2>      
    </div> */}
    <div>

      <TextField
        name="message"
        onChange={e => onTextChange(e)}
        value={state.message}
        id="outlined-multiline-static"
        variant="outlined"
        label="Message"
        fullWidth='true'
      />
    </div>
    <button className="multiplayer-lobby-buttons">Send Message</button>
  </form>
   <div className="render-chat">
      <h1>Messages</h1>
        {renderChat}
    </div>
</div>
)

}