import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'
import TextField from '@material-ui/core/TextField'
import './Chat.scss'

const socket = io.connect('http://localhost:3001')

export default function GameData(props) {

const [state, setState] = useState({ socore: ''})
const [gameData, setGameData] = useState([])

/* message types we are receiving
message {name, message}
gameData {name, score}

score = solved.length / game.words.length
*/
  useEffect(() => {
    socket.on('gameData', ({ name, score }) => {
      setGameData([...gameData, { name, gameData }])
    })
  })


  const renderChat = () => {
    return chat.map(({ name, gameData }, index) => (
      <div key={index}>
        <h3>
          {name}: <span>{gameData}</span>
        </h3>
      </div>
    ))
  }

return (
  <div className="card">
  <form onSubmit={onMessageSubmit}>
    <h1>Messenger</h1>
    <div className="name-field">
      <h2>Current User: {props.loggedUser}</h2>      
    </div>
    <div>

      <TextField
        name="message"
        onChange={e => onTextChange(e)}
        value={state.message}
        id="outlined-multiline-static"
        variant="outlined"
        label="Message"
      />
    </div>
    <button>Send Message</button>
  </form>
  <div className="render-chat">
    <h1>Chat Log</h1>
    {renderChat()}
  </div>
</div>
)

}