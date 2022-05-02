import { FOODS_CATEGORIES, DRINKS_CATEGORIES } from './actionsTypes';

export const foodsCategoriesAction = (value) => ({
  type: FOODS_CATEGORIES,
  value,
});

export const drinksCategoriesAction = (value) => ({
  type: DRINKS_CATEGORIES,
  value,
});
