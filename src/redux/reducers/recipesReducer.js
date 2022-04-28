import { SEARCH_RECIPES } from '../actions/actionsTypes';

const INITIAL_STATE = { meals: [], drinks: [] };

const recipesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SEARCH_RECIPES:
    return action.value;
  default:
    return state;
  }
};

export default recipesReducer;
