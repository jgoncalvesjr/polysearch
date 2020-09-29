export const SET_USERS = 'SET_USERS';
export const  DIFFICULTY_SETTING = 'DIFFICULTY_SETTING';

const dataReducer = (state, action) => {

  const actions = {
    SET_USERS: {
      ...state,
      users: action.users,
      loading: false,
    },
    DIFFICULTY_SETTING: {
      ...state, difficulty: action.difficulty
    }
  };

  return actions[action.type] || state;
};

export default dataReducer;