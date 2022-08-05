/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import getFoods from '../API/getFoods';
import ShareBTN from '../components/ShareBTN';
import FavoriteBTN from '../components/FavoriteBTN';
import ProgressIngredientsRecipe from '../components/ProgressIngredientsRecipe';
import Style from './css/Recipe.module.css';

function FoodRecipeProgress() {
  const { id } = useParams();
  const [food, setFood] = useState(undefined);
  const [finsishDisabled, setFinishDisabled] = useState(true);
  const { push } = useHistory();

  useEffect(() => {
    async function getData() {
      const response = await getFoods(id, 'id');
      setFood(response.meals[0]);
    }
    getData();
  }, []);

  const handleFinshiRecipe = () => {
    push('/done-recipes');
  };

  return (
    <div className={ Style.container }>
      {food !== undefined && (
        <>
          <img
            src={ food.strMealThumb }
            className={ Style['recipe-image'] }
            alt={ food.strMeal }
            data-testid="recipe-photo"
          />
          <div className={ Style.titleAndIcons }>
            <h2 data-testid="recipe-title">{food.strMeal}</h2>
            <div className={ Style.icons }>
              <ShareBTN />
              <FavoriteBTN recipe={ food } />
            </div>
          </div>
          <p data-testid="recipe-category">{food.strCategory}</p>
          <h3>Ingredients</h3>
          <ProgressIngredientsRecipe
            recipe={ food }
            type="food"
            id={ id }
            disableButton={ setFinishDisabled }
          />

          <h3>Instructions</h3>
          <p data-testid="instructions">{food.strInstructions}</p>
          <iframe
            data-testid="video"
            width="300"
            height="200"
            src={ food.strYoutube.replace('watch?v=', 'embed/') }
            title="YouTube video player"
            frameBorder="0"
            allow={ 'accelerometer; autoplay; clipboard-write; '
              .concat('encrypted-media; gyroscope; picture-in-picture') }
            allowFullScreen
          />
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

export default FoodRecipeProgress;
