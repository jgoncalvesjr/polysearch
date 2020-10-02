import React from "react";
const socket = require('socket.io');

export default function Chat() {
  let message = document.getElementById('message'),
      handle = document.getElementById('handle'),
      btn = document.getElementById('send'),
      output = document.getElementById('output'),
      feedback = document.getElementById('feedback');


//emit events
btn.addEventListener('click', function(){
socket.emit('chat', {
message: message.value,
handle: handle.value
});
message.value="";
});

message.addEventListener('keypress', function(){
socket.emit('typing', handle.value);
})

//listen for events
socket.on('chat', function(data){
feedback.innerHTML = '';
output.innerHTML += '<p><strong>' + data.handle + ':</strong>' + data.message + '</p>';
});

socket.on('typing', function(data){
feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});


//-----------------
// Reactconversion

return (
  <main>
    <head>
       
        <title>Chat</title>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/1.7.3/socket.io.js"></script>
        <link href="/styles.css" rel="stylesheet" />
    </head>
    <body>

        <div id="chat">
            <h2>Chat</h2>
            <div id="chat-window">
                <div id="output"></div>
                <div id="feedback"></div>
            </div>
            <input id="handle" type="text" placeholder="Handle" />
            <input id="message" type="text" placeholder="Message" />
            <button id="send">Send</button>
        </div>


    </body>
    
  </main>
)
}