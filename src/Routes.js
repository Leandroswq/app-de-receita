import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NotFound from './components/NotFound';
import DoneRecipes from './pages/DoneRecipes';
import DrinkRecipe from './pages/DrinkRecipe';
import DrinkRecipeProgress from './pages/DrinkRecipeProgress';
import Drinks from './pages/Drinks';
import Explore from './pages/Explore';
import ExploreDrink from './pages/ExploreDrink';
import ExploreDrinkIngredients from './pages/ExploreDrinkIngredients';
import ExploreFood from './pages/ExploreFood';
import ExploreFoodIngredients from './pages/ExploreFoodIngredients';
import ExploreFoodNationalities from './pages/ExploreFoodNationalities';
import FavoriteRecipes from './pages/FavoriteRecipes';
import FoodRecipe from './pages/FoodRecipe';
import FoodRecipeProgress from './pages/FoodRecipeProgress';
import Foods from './pages/Foods';
import Login from './pages/Login';
import Profile from './pages/Profile';

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
      <Route
        exact
        path="/explore/drinks/nationalities"
        component={ NotFound }
      />
      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/done-recipes" component={ DoneRecipes } />
      <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
    </Switch>
  );
}

export default Routes;
