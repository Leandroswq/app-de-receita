import React from 'react';
import CardDoneRecipes from '../components/CardDoneRecipes';
import Header from '../components/Header';
import { getLocalStorage } from '../helpers';

function DoneRecipes() {
  const data = getLocalStorage('doneRecipes');

  return (
    <div>
      <Header title="Done Recipes" />
      <div>
        <button
          data-testid="filter-by-all-btn"
          type="button"
        >
          All
        </button>
        <button
          data-testid="filter-by-food-btn"
          type="button"
        >
          Food
        </button>
        <button
          data-testid="filter-by-drink-btn"
          type="button"
        >
          Drink
        </button>
      </div>
      {
        data.map((elem, i) => (
          <CardDoneRecipes
            key={ elem.id }
            data={ elem }
            index={ i }
          />))
      }
    </div>
  );
}

export default DoneRecipes;
