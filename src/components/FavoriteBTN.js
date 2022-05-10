/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getLocalStorage, setLocalStorage } from '../helpers';
import favoritIcon from '../images/blackHeartIcon.svg';
import noFavoriteicon from '../images/whiteHeartIcon.svg';

function createFavoriteObj(recipe, basePage) {
  if (basePage === 'drinks') {
    return {
      id: recipe.idDrink,
      type: 'drink',
      nationality: recipe.strArea ? recipe.strArea : '',
      category: recipe.strCategory ? recipe.strCategory : '',
      alcoholicOrNot: recipe.strAlcoholic ? recipe.strAlcoholic : '',
      name: recipe.strDrink,
      image: recipe.strDrinkThumb,
    };
  } if (basePage === 'foods') {
    return {
      id: recipe.idMeal,
      type: 'food',
      nationality: recipe.strArea ? recipe.strArea : '',
      category: recipe.strCategory ? recipe.strCategory : '',
      alcoholicOrNot: recipe.strAlcoholic ? recipe.strAlcoholic : '',
      name: recipe.strMeal,
      image: recipe.strMealThumb,
    };
  }
  console.log(recipe);
  return recipe;
}
function getID(recipe) {
  if (recipe.idDrink) return recipe.idDrink;
  if (recipe.idMeal) return recipe.idMeal;
  return recipe.id;
}

function FavoriteBTN({ recipe, dataTestid, setData }) {
  const { location: { pathname } } = useHistory();
  const basePage = pathname.split('/')[1];
  const id = getID(recipe);
  console.log(id);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    const favoriteRecipes = getLocalStorage('favoriteRecipes');
    if (favoriteRecipes) {
      const recipeValidation = favoriteRecipes
        .find((item) => Number(item.id) === Number(id));
      if (recipeValidation) {
        setFavorite(true);
      }
    } else {
      setLocalStorage('favoriteRecipes', []);
    }
  }, []);
  const handleClick = () => {
    let favoriteRecipes = getLocalStorage('favoriteRecipes');
    if (favorite) {
      favoriteRecipes = favoriteRecipes.filter((item) => item.id !== id);
    } else {
      const favoriteObj = createFavoriteObj(recipe, basePage);
      favoriteRecipes.push(favoriteObj);
    }
    setLocalStorage('favoriteRecipes', favoriteRecipes);
    setFavorite((p) => !p);
    setData(favoriteRecipes);
  };

  return (
    <button
      type="button"
      data-testid={ dataTestid || 'favorite-btn' }
      onClick={ handleClick }
      src={ favorite ? favoritIcon : noFavoriteicon }
    >
      <img src={ favorite ? favoritIcon : noFavoriteicon } alt="favorite" />
    </button>
  );
}

FavoriteBTN.propTypes = {
  dataTestid: PropTypes.string,
  recipe: PropTypes.objectOf(PropTypes.any).isRequired,
  setData: PropTypes.func,
};

FavoriteBTN.defaultProps = {
  dataTestid: null,
  setData: () => {},
};
export default FavoriteBTN;
