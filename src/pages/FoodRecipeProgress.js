import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import getFoods from '../API/getFoods';
import { searchRecipesAc } from '../redux/actions/searchActions';
import shareIcon from '../images/shareIcon.svg';
import favoritIcon from '../images/whiteHeartIcon.svg';
import { filterValuesFromObjectToArray } from '../helpers';

function FoodRecipeProgress() {
  const foods = useSelector(({ recipesReducer }) => recipesReducer.meals);
  const { id } = useParams();
  const food = foods.length === 1 && foods[0].idMeal === id ? foods[0] : undefined;
  const dispatch = useDispatch();

  useEffect(() => {
    async function getData() {
      const response = await getFoods(id, 'id');
      dispatch(searchRecipesAc(response));
    }
    getData();
  }, []);

  if (food !== undefined) {
    console.log(filterValuesFromObjectToArray(/strMeasure/i, food));
  }

  const createIngredientAndMeasureArray = () => {
    const ingredient = filterValuesFromObjectToArray(/strIngredient/i, food);
    const measure = filterValuesFromObjectToArray(/strMeasure/i, food);
    const measureAndIngredient = ingredient
      .map((item, ind) => [item[1], measure[ind][1]]);
    console.log(food);
    return measureAndIngredient;
  };

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

          <button type="button" data-testid="share-btn">
            <img src={ shareIcon } alt="share" />
          </button>
          <button type="button" data-testid="favorite-btn">
            <img src={ favoritIcon } alt="favorite" />
          </button>

          <p data-testid="recipe-category">{food.strCategory}</p>
          <h3>Ingredients</h3>
          <div>
            {
              createIngredientAndMeasureArray()
                .map((item, ind) => (
                  <label
                    key={ `ingredient-${ind}` }
                    htmlFor={ `ingredient-${ind}` }
                    data-testid="ingredient-step"
                  >
                    <input
                      type="checkbox"
                      name={ `ingredient-${ind}` }
                      id={ `ingredient-${ind}` }
                    />
                    {`-${item[0]}-${item[1]}`}
                  </label>
                ))
            }
          </div>
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
            type="button"
          >
            Finalizar
          </button>
        </>

      )}
    </div>
  );
}

export default FoodRecipeProgress;
