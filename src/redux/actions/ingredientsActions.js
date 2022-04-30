import { SERACH_FOODS_INGREDIENTS, SERACH_DRINKS_INGREDIENTS } from './actionsTypes';

export const searchFoodIngredients = (value) => ({
  type: SERACH_FOODS_INGREDIENTS, value });

export const searchDrinksIngredients = (value) => ({
  type: SERACH_DRINKS_INGREDIENTS, value });
