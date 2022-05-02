import { combineReducers } from 'redux';
import recipesReducer from './recipesReducer';
import ingredientsReducer from './ingredientsReducer';

const rootReducer = combineReducers({
  recipesReducer,
  ingredientsReducer,
});

export default rootReducer;
