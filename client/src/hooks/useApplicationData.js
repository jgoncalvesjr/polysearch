import { useEffect, useReducer } from 'react';
import axios from 'axios';

import dataReducer, { SET_USERS,  DIFFICULTY_SETTING, SET_NEW_GAME, DIFFICULTY_LEVEL } from '../reducers/dataReducer';

const useApplicationData = () => {
  const [state, dispatch] = useReducer(dataReducer, {
    users: [],
    loading: true,
    game: null,
  });

  const getNewGame = function(multiplayer, difficultyLevel, duration) {
    return new Promise((resolve, reject) => {
      let currentUserId = localStorage.getItem('userId');
      return axios.put("/api/games", {
        
          host_id: currentUserId,
          mode: difficultyLevel.toLowerCase(),
          multiplayer: multiplayer,
          duration: duration
          
      }
      ).then(({ data }) => {
        dispatch({ type: SET_NEW_GAME, game: data });
        resolve({data_hostId: data.host_id, link: data.link, difficultyLevel: data.mode, bolMultiplayer: data.multiplayer, gameDuration: data.duration});
      })
      .catch(error => {
        reject(error);
      })
    });
  };  

  const startMultiplayerGame = (gameId) => {	
    return new Promise((resolve, reject) => {	
      axios({	
        method: 'GET',	
        url: `/api/games/${gameId}`	
      }).then(({ data }) => {	
        dispatch({ type: SET_NEW_GAME, game: data });	
        resolve({data_hostId: data.host_id, link: data.link, difficultyLevel: data.mode, bolMultiplayer: data.multiplayer, gameDuration: data.duration});	
      })	
      .catch(err => {	
        reject(err);	
      });	
    });	
  };

  return {
    state,
    dispatch,
    getNewGame,
    startMultiplayerGame,
  };
};

export default useApplicationData;