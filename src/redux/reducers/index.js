import { combineReducers } from 'redux';
import nomeReducer1 from './searchReducer';
import user from './userReducer';

const rootReducer = combineReducers({
  nomeReducer1,
  user,
});

export default rootReducer;
