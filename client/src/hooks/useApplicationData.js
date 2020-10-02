import { useEffect, useReducer } from 'react';
import axios from 'axios';

import dataReducer, { SET_USERS,  DIFFICULTY_SETTING, SET_NEW_GAME } from '../reducers/dataReducer';

const useApplicationData = () => {
  const [state, dispatch] = useReducer(dataReducer, {
    users: [],
    loading: true,
    //difficulty: "Easy",
    game: null
  });

   useEffect(() => {
    axios({
      method: 'GET',
      url: '/api/users',
    }).then(({ data }) => {
      // update the state with the result
      dispatch({ type: SET_USERS, users: data });
    });
  }, []);

  //TODO: need to change to put once we are creating game in database.
  const getNewGame = () => {
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
  };

  //const setDifficulty = pdifficulty => dispatch({type: DIFFICULTY_SETTING, difficulty: pdifficulty});

  return {
    state,
    dispatch,
    getNewGame
  };
};

export default useApplicationData;