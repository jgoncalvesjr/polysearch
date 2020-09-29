import { useEffect, useReducer } from 'react';
import axios from 'axios';
import dataReducer, { SET_USERS,  DIFFICULTY_SETTING } from '../reducers/dataReducer';

const useApplicationData = () => {
  const [state, dispatch] = useReducer(dataReducer, {
    users: [],
    loading: true,
    difficulty: "Easy"
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

  const setDifficulty = pdifficulty => dispatch({type: DIFFICULTY_SETTING, difficulty: pdifficulty});

  return {
    state,
    dispatch,
    setDifficulty
  };
};

export default useApplicationData;