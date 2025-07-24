import { combineReducers } from 'redux';
import postReducer from './postReducers';
import userReducer from './userReducers';

const rootReducer = combineReducers({
  posts: postReducer,
  users: userReducer,
});

export default rootReducer;