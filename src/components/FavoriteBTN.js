/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getLocalStorage, setLocalStorage } from '../helpers';
import noFavoriteicon from '../images/whiteHeartIcon.svg';
import favoritIcon from '../images/blackHeartIcon.svg';

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
}

function FavoriteBTN({ recipe }) {
  const { location: { pathname } } = useHistory();
  const basePage = pathname.split('/')[1];
  const { id } = useParams();
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
  };

  return (
    <button
      type="button"
      data-testid="favorite-btn"
      onClick={ handleClick }
      src={ favorite ? favoritIcon : noFavoriteicon }
    >
      <img src={ favorite ? favoritIcon : noFavoriteicon } alt="favorite" />
    </button>
  );
}

FavoriteBTN.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default FavoriteBTN;
