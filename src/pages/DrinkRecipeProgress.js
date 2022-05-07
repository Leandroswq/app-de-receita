/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getDrinks from '../API/getDrinks';
import ShareBTN from '../components/ShareBTN';
import FavoriteBTN from '../components/FavoriteBTN';
import ProgressIngredientsRecipe from '../components/ProgressIngredientsRecipe';

function DrinkRecipeProgress() {
  const { id } = useParams();
  const [drink, setDrink] = useState(undefined);

  useEffect(() => {
    async function getData() {
      const response = await getDrinks(id, 'id');
      setDrink(response.drinks[0]);
    }
    getData();
  }, []);

  return (
    <div>
      {drink !== undefined && (
        <>
          <img
            src={ drink.strDrinkThumb }
            alt={ drink.strDrink }
            data-testid="recipe-photo"
          />
          <h2 data-testid="recipe-title">{drink.strDrink}</h2>

          <ShareBTN />
          <FavoriteBTN recipe={ drink } />

          <p data-testid="recipe-category">{drink.strAlcoholic}</p>
          <h3>Ingredients</h3>
          <ProgressIngredientsRecipe recipe={ drink } type="drink" id={ id } />
          <h3>Instructions</h3>
          <p data-testid="instructions">{drink.strInstructions}</p>
          <div data-testid={ `${0}-recomendation-card` }>Receitas recomendadas</div>
          <div data-testid={ `${1}-recomendation-card` }>Receitas recomendadas</div>
          <button
            data-testid="finish-recipe-btn"
            type="button"
          >
            Finalizar
          </button>
        </>
      )}
    </div>
  );
}

export default DrinkRecipeProgress;
