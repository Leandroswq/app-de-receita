import React, { useEffect, useState } from 'react';
import CardDoneRecipes from '../components/CardDoneRecipes';
import Header from '../components/Header';
import { getLocalStorage, setLocalStorage } from '../helpers';

function DoneRecipes() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const doneRecipes = getLocalStorage('doneRecipes');
    if (doneRecipes) {
      setData(doneRecipes);
    } else {
      setLocalStorage('doneRecipes', []);
    }
  }, []);

  const handleFilter = ({ target }) => {
    if (target.value !== 'All') {
      const doneRecipes = getLocalStorage('doneRecipes'); // reseta o filtro mas não funcionou;
      setData(doneRecipes);
      setData(data.filter((elem) => elem.type === target.value));
    } else {
      const doneRecipes = getLocalStorage('doneRecipes');
      setData(doneRecipes);
    }
  };
  return (
    <div>
      <Header title="Done Recipes" />
      <div>
        <button
          data-testid="filter-by-all-btn"
          type="button"
          value="All"
          onClick={ handleFilter }
        >
          All
        </button>
        <button
          data-testid="filter-by-food-btn"
          type="button"
          value="food"
          onClick={ handleFilter }
        >
          Food
        </button>
        <button
          data-testid="filter-by-drink-btn"
          type="button"
          value="drink"
          onClick={ handleFilter }
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
