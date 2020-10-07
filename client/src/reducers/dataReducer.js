export const SET_USERS = 'SET_USERS';
export const  DIFFICULTY_LEVEL = 'DIFFICULTY_LEVEL';
export const SET_NEW_GAME = "SET_NEW_GAME";
//export const GAME_WINNER_DATA = "GAME_WINNER_DATA";

const dataReducer = (state, action) => {

  const actions = {
    SET_USERS: {
      ...state,
      users: action.users,
      loading: false,
    },
    /*GAME_WINNER_DATA: {
      ...state, matchWinner: [...state.matchWinner, action.winnerData]
    },*/
    /*DIFFICULTY_LEVEL: {
      ...state, difficulty: action.difficulty
    },*/
    SET_NEW_GAME: {
      ...state, game: action.game
    }
  };

  return actions[action.type] || state;
};

export default dataReducer;