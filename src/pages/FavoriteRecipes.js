import React, { useEffect, useState } from 'react';
import CardDoneRecipes from '../components/CardDoneRecipes';
import Header from '../components/Header';
import { getLocalStorage, setLocalStorage } from '../helpers';
import Style from './css/FavoriteRecipes.module.css';

function FavoriteRecipes() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const favoriteRecipes = getLocalStorage('favoriteRecipes');
    if (favoriteRecipes) {
      setData(favoriteRecipes);
    } else {
      setLocalStorage('favoriteRecipes', []);
    }
  }, []);

  const handleFilter = ({ target }) => {
    if (target.value !== 'All') {
      const favoriteRecipes = getLocalStorage('favoriteRecipes'); // reseta o filtro mas não funcionou;
      setData(favoriteRecipes);
      setData(data.filter((elem) => elem.type === target.value));
    } else {
      const favoriteRecipes = getLocalStorage('favoriteRecipes');
      setData(favoriteRecipes);
    }
  };
  return (
    <div className={ Style.container }>
      <Header title="Favorite Recipes" />
      <div className={ Style['container-buttons'] }>
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
      <div className={ Style.card }>
        {
          data.map((elem, i) => (
            <CardDoneRecipes
              setData={ setData }
              key={ elem.id }
              data={ elem }
              index={ i }
            />))
        }
      </div>
    </div>
  );
}

export default FavoriteRecipes;
