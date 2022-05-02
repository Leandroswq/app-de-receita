import { combineReducers } from 'redux';
import recipesReducer from './recipesReducer';
import ingredientsReducer from './ingredientsReducer';
import categoriesReducer from './categoriesReducer';

const rootReducer = combineReducers({
  recipesReducer,
  ingredientsReducer,
  categoriesReducer,
});

export default rootReducer;
