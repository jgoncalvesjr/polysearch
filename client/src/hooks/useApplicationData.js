import { useEffect, useReducer } from 'react';
import axios from 'axios';

import dataReducer, { SET_USERS,  DIFFICULTY_SETTING, SET_NEW_GAME, DIFFICULTY_LEVEL } from '../reducers/dataReducer';
//import { duration } from '@material-ui/core';
//import io from 'socket.io-client'
//const socket = io.connect('http://localhost:3001')

const useApplicationData = () => {
  const [state, dispatch] = useReducer(dataReducer, {
    users: [],
    loading: true,
    //difficulty: "Easy",
    game: null,
  });

  //
/*   //const socket = io.connect('http://localhost:3001')
const sendSocketData = (type, obj) => {
  socket.emit(type, obj);
}
//let matchWinner = [];

   useEffect(() => {
    socket.on('gameData', ({HostedGameId,  name, score}) => {
      console.log(`Here is the socket info call at the end of the game: gameId: ${HostedGameId} name:${name} score: ${parseInt(score)}`);
      if(!score){
        score=0
      }
      //matchWinner.push({name, score: parseInt(score)})
      //console.log('useApplicationData match winder array', matchWinner);
      dispatch({type: GAME_WINNER_DATA, winnerData: {name, score: parseInt(score)}})
  });
  
  socket.on('solved', ({HostedGameId, HostedGameSolved}) => {
    console.log("useApplicationData HostedGameId", HostedGameId)
    const objSolved = JSON.parse(HostedGameSolved);
    console.log("useApplicationData objSolved", objSolved);
  });  
  }); */

  //TODO: need to change to put once we are creating game in database.
/*   const getNewGame2 = () => {
    return new Promise((resolve, reject) => {
      axios({
        method: 'GET',
        url: '/api/games/newgame',
      }).then(({ data }) => {
        console.log("gameData", data);
        dispatch({ type: SET_NEW_GAME, game: data });
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
    });
  }; */

  const getNewGame = function(multiplayer, difficultyLevel, duration) {
    return new Promise((resolve, reject) => {
      console.log(`clicked start new game`)
      let currentUserId = localStorage.getItem('userId');
      console.log('here is the currentuserid: ', currentUserId);
      return axios.put("/api/games", {
        
          host_id: currentUserId,
          mode: difficultyLevel.toLowerCase(),
          multiplayer: multiplayer,
          duration: duration
          
      }
      ).then(({ data }) => {
        console.log("start new game response", data);   
        dispatch({ type: SET_NEW_GAME, game: data });
        resolve({data_hostId: data.host_id, link: data.link, difficultyLevel: data.mode, bolMultiplayer: data.multiplayer, gameDuration: data.duration});
      })
      .catch(error => {
        console.log("start new game call error: ", error);
        reject(error);
      })
    });
  };  

  const startMultiplayerGame = (gameId) => {	
    return new Promise((resolve, reject) => {	
      console.log("axios get", gameId);
      axios({	
        method: 'GET',	
        url: `/api/games/${gameId}`	
      }).then(({ data }) => {	
        console.log('Here is the data being retrieved: ',data);	
        dispatch({ type: SET_NEW_GAME, game: data });	
        // trying to make the data from the axios get request retrievable by all everything.	
        resolve({data_hostId: data.host_id, link: data.link, difficultyLevel: data.mode, bolMultiplayer: data.multiplayer, gameDuration: data.duration});	
      })	
      .catch(err => {	
        reject(err);	
      });	
    });	
  };

  //const setDifficulty = pdifficulty => dispatch({type: DIFFICULTY_SETTING, difficulty: pdifficulty});

  return {
    state,
    dispatch,
    getNewGame,
    startMultiplayerGame,
  };
};

export default useApplicationData;