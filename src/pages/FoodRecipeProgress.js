/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import getFoods from '../API/getFoods';
import { searchRecipesAc } from '../redux/actions/searchActions';
import ShareBTN from '../components/ShareBTN';
import FavoriteBTN from '../components/FavoriteBTN';
import ProgressIngredientsRecipe from '../components/ProgressIngredientsRecipe';

function FoodRecipeProgress() {
  const foods = useSelector(({ recipesReducer }) => recipesReducer.meals);
  const { id } = useParams();
  const food = foods.length === 1 && foods[0].idMeal === id ? foods[0] : undefined;
  const [finsishDisabled, setFinishDisabled] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getData() {
      const response = await getFoods(id, 'id');
      dispatch(searchRecipesAc(response));
    }
    getData();
  }, []);

  return (
    <div>
      {food !== undefined && (
        <>
          <img
            src={ food.strMealThumb }
            alt={ food.strMeal }
            data-testid="recipe-photo"
          />
          <h2 data-testid="recipe-title">{food.strMeal}</h2>

          <ShareBTN />
          <FavoriteBTN recipe={ food } />

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
          {/*           <iframe
            data-testid="video"
            width="300"
            height="200"
            src={ food.strYoutube.replace('watch?v=', 'embed/') }
            title="YouTube video player"
            frameBorder="0"
            allow={ 'accelerometer; autoplay; clipboard-write; '
              .concat('encrypted-media; gyroscope; picture-in-picture') }
            allowFullScreen
          /> */}
          <button
            data-testid="finish-recipe-btn"
            type="button"
            disabled={ finsishDisabled }

          >
            Finalizar
          </button>
        </>

      )}
    </div>
  );
}

export default FoodRecipeProgress;
