import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Foods from './pages/Foods';
import Login from './pages/Login';
import Drinks from './pages/Drinks';
import FoodRecipe from './pages/FoodRecipe';
import DrinkRecipe from './pages/DrinkRecipe';
import FoodRecipeProgress from './pages/FoodRecipeProgress';
import DrinkRecipeProgress from './pages/DrinkRecipeProgress';
import Explore from './pages/Explore';
import ExploreFood from './pages/ExploreFood';
import ExploreDrink from './pages/ExploreDrink';
import ExploreFoodIngredients from './pages/ExploreFoodIngredients';
import ExploreDrinkIngredients from './pages/ExploreDrinkIngredients';
import ExploreFoodNationalities from './pages/ExploreFoodNationalities';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/foods" component={ Foods } />
      <Route exact path="/drinks" component={ Drinks } />
      <Route exact path="/foods/:id" component={ FoodRecipe } />
      <Route exact path="/drinks/:id" component={ DrinkRecipe } />
      <Route exact path="/foods/:id/in-progress" component={ FoodRecipeProgress } />
      <Route exact path="/drinks/:id/in-progress" component={ DrinkRecipeProgress } />
      <Route exact path="/explore" component={ Explore } />
      <Route exact path="/explore/foods" component={ ExploreFood } />
      <Route exact path="/explore/drinks" component={ ExploreDrink } />
      <Route
        exact
        path="/explore/foods/ingredients"
        component={ ExploreFoodIngredients }
      />
      <Route
        exact
        path="/explore/drinks/ingredients"
        component={ ExploreDrinkIngredients }
      />
      <Route
        exact
        path="/explore/foods/nationalities"
        component={ ExploreFoodNationalities }
      />
      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/done-recipes" component={ DoneRecipes } />
      <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
    </Switch>
  );
}

export default Routes;
