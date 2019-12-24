import { user } from '../actionTypes';

const initialState = {
  user: {
    id: 0,
    avatar: '',
    about: '',
    favorites: [],
    login: '',
    name: '',
    subscribs: [],
    followers: [],
  },
};

// const setUser = (state, action) => {
//   const newUser = action.user;
//   const oldUser = state.user;
//   const test = { ...oldUser, ...newUser };
//   return {
//     ...state,
//     user: test,

//   };
// };
const deleteUser = (state, action) => {
  const newUser = initialState;
  return {
    ...state,
    user: newUser,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case user.SET_USER:
      return {
        ...state,
        user: { ...state.user, ...action.user },
      };

    case user.DELETE_USER:
      return deleteUser(state, action);
    default:
      return state;
  }
};
export default reducer;
