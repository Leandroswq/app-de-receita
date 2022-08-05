/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import getDrinks from '../API/getDrinks';
import FavoriteBTN from '../components/FavoriteBTN';
import ProgressIngredientsRecipe from '../components/ProgressIngredientsRecipe';
import ShareBTN from '../components/ShareBTN';
import Style from './css/Recipe.module.css';

function DrinkRecipeProgress() {
  const { id } = useParams();
  const [drink, setDrink] = useState(undefined);
  const [finsishDisabled, setFinishDisabled] = useState(true);
  const { push } = useHistory();

  useEffect(() => {
    async function getData() {
      const response = await getDrinks(id, 'id');
      setDrink(response.drinks[0]);
    }
    getData();
  }, []);

  const handleFinshiRecipe = () => {
    push('/done-recipes');
  };

  return (
    <div className={ Style.container }>
      {drink !== undefined && (
        <>
          <img
            src={ drink.strDrinkThumb }
            className={ Style['recipe-image'] }
            alt={ drink.strDrink }
            data-testid="recipe-photo"
          />
          <div className={ Style.titleAndIcons }>

            <h2 data-testid="recipe-title">{drink.strDrink}</h2>
            <div className={ Style.icons }>

              <ShareBTN />
              <FavoriteBTN recipe={ drink } />
            </div>
          </div>

          <p data-testid="recipe-category">{drink.strAlcoholic}</p>
          <h3>Ingredients</h3>
          <ProgressIngredientsRecipe
            recipe={ drink }
            type="drink"
            id={ id }
            disableButton={ setFinishDisabled }
          />
          <h3>Instructions</h3>
          <p data-testid="instructions">{drink.strInstructions}</p>
          <div data-testid={ `${0}-recomendation-card` }>Receitas recomendadas</div>
          <div data-testid={ `${1}-recomendation-card` }>Receitas recomendadas</div>
          <button
            data-testid="finish-recipe-btn"
            className={ `${Style['fixed-btn']} ${Style['continue-recipe']}` }
            type="button"
            disabled={ finsishDisabled }
            onClick={ handleFinshiRecipe }

          >
            Finalizar
          </button>
        </>
      )}
    </div>
  );
}

export default DrinkRecipeProgress;
