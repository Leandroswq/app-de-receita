/* eslint-disable sonarjs/no-duplicate-string */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import getDrinks from '../API/getDrinks';
import Style from './css/SearchBar.module.css';
import getFoods from '../API/getFoods';
import { searchRecipesAc } from '../redux/actions/searchActions';

const messageFilter = 'Sorry, we haven\'t found any recipes for these filters.';

function SearchBar() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [filters, setFilters] = useState({
    input: '',
    filter: '',
  });

  const handleChange = ({ target }) => {
    if (target.name === 'input') {
      setFilters((previousS) => ({ ...previousS, input: target.value }));
    }
    if (target.name === 'filters') {
      setFilters((previousS) => ({ ...previousS, filter: target.value }));
    }
  };

  const handleClick = async () => {
    if (filters.filter === 'firstLetter' && filters.input.length > 1) {
      return global.alert('Your search must have only 1 (one) character');
    }
    let data;
    if (history.location.pathname.includes('/foods')) {
      data = await getFoods(filters.input, filters.filter);
      if (!data.meals) {
        global.alert(messageFilter);
      }
    }

    if (history.location.pathname.includes('/drinks')) {
      data = await getDrinks(filters.input, filters.filter);
      if (!data.drinks) {
        global.alert(messageFilter);
      }
    }

    dispatch(searchRecipesAc(data));

    if (data.meals && data.meals.length === 1) {
      history.push(`/foods/${data.meals[0].idMeal}`);
    }
    if (data.drinks && data.drinks.length === 1) {
      history.push(`/drinks/${data.drinks[0].idDrink}`);
    }
  };

  return (
    <form className={ Style.container }>
      <input
        data-testid="search-input"
        name="input"
        className={ Style.searchInput }
        value={ filters.input }
        placeholder="Type here to search"
        onChange={ handleChange }
      />
      <div className={ Style.filters }>
        <label
          htmlFor="ingredient-search-radio"
          className={ Style['rad-label'] }
        >
          <input
            type="radio"
            name="filters"
            id="ingredient-search-radio"
            data-testid="ingredient-search-radio"
            onChange={ handleChange }
            value="ingredient"
            className={ Style['rad-input'] }
          />
          <div className={ Style['rad-design'] } />
          <div className={ Style['rad-text'] }>Ingredient</div>
        </label>
        <label
          htmlFor="name-search-radio"
          className={ Style['rad-label'] }
        >
          <input
            type="radio"
            name="filters"
            id="name-search-radio"
            data-testid="name-search-radio"
            value="name"
            onChange={ handleChange }
            className={ Style['rad-input'] }
          />
          <div className={ Style['rad-design'] } />
          <div className={ Style['rad-text'] }>Name</div>
        </label>
        <label
          htmlFor="first-letter-search-radio"
          className={ Style['rad-label'] }
        >
          <input
            type="radio"
            name="filters"
            data-testid="first-letter-search-radio"
            id="first-letter-search-radio"
            value="firstLetter"
            onChange={ handleChange }
            className={ Style['rad-input'] }
          />
          <div className={ Style['rad-design'] } />
          <div className={ Style['rad-text'] }>First Letter</div>
        </label>
      </div>
      <button
        type="button"
        className={ Style.searchBtn }
        data-testid="exec-search-btn"
        onClick={ handleClick }
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;
