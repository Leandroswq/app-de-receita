import { FOODS_CATEGORIES, DRINKS_CATEGORIES } from '../actions/actionsTypes';

const INITIAL_STATE = { mealsCategories: [], drinksCategories: [] };

const categoriesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FOODS_CATEGORIES:
    return { ...state, mealsCategories: action.value.meals };
  case DRINKS_CATEGORIES:
    return { ...state, drinksCategories: action.value.drinks };
  default:
    return state;
  }
};

export default categoriesReducer;
