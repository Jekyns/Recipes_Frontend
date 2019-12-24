import { combineReducers } from 'redux';

import userStore from './user/reducer';

const rootReducer = combineReducers({
  userStore,
});

export default rootReducer;
