import { SERACH_FOODS_INGREDIENTS,
  SERACH_DRINKS_INGREDIENTS } from '../actions/actionsTypes';

const INITIAL_STATE = {
  foodIngredient: [],
  drinkIngredient: [],
};

const ingredientsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SERACH_FOODS_INGREDIENTS:
    return { ...state, foodIngredient: action.value.meals };
  case SERACH_DRINKS_INGREDIENTS:
    return { ...state, drinkIngredient: action.value.drinks };
  default:
    return state;
  }
};

export default ingredientsReducer;
