export const SET_USERS = 'SET_USERS';
export const  DIFFICULTY_SETTING = 'DIFFICULTY_SETTING';
export const SET_NEW_GAME = "SET_NEW_GAME";

const dataReducer = (state, action) => {

  const actions = {
    SET_USERS: {
      ...state,
      users: action.users,
      loading: false,
    },
    /*DIFFICULTY_SETTING: {
      ...state, difficulty: action.difficulty
    },*/
    SET_NEW_GAME: {
      ...state, game: action.game
    }
  };

  return actions[action.type] || state;
};

export default dataReducer;