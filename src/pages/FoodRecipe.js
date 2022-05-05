/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import getFoods from '../API/getFoods';
import favoritIcon from '../images/whiteHeartIcon.svg';
import { filterValuesFromObjectToArray, statusRecipes } from '../helpers';
import Card from '../components/Card';
import getDrinks from '../API/getDrinks';
import Style from './css/Recipe.module.css';
import ShareBTN from '../components/ShareBTN';

const magicNumber6 = 6;

function FoodRecipe() {
  const { id } = useParams();
  const [food, setFood] = useState(undefined);
  const [recomendedDrinks, setRecomendedDrinks] = useState([]);
  const [shownStartRecipeBtn, setShownStartRecipeBtn] = useState(false);
  const { push } = useHistory();

  useEffect(() => {
    async function getData() {
      const response = await getFoods(id, 'id');
      setFood(response.meals[0]);
    }
    async function setDrinks() {
      const response = await getDrinks('', 'name');
      const data = response.drinks
        .slice(0, magicNumber6);
      setRecomendedDrinks(data);
    }
    setShownStartRecipeBtn(statusRecipes(id, 'meals'));

    getData();
    setDrinks();
  }, []);

  const createIngredientAndMeasureArray = () => {
    const ingredient = filterValuesFromObjectToArray(/strIngredient/i, food);
    const measure = filterValuesFromObjectToArray(/strMeasure/i, food);
    const measureAndIngredient = ingredient
      .map((item, ind) => [item[1], measure[ind][1]]);
    return measureAndIngredient;
  };

  const handleBtnStartRecipe = () => {
    push(`/foods/${id}/in-progress`);
  };

  return (
    <div className={ Style.container }>
      {food !== undefined && (
        <>
          <img
            src={ food.strMealThumb }
            alt={ food.strMeal }
            data-testid="recipe-photo"
            className={ Style['recipe-image'] }
          />
          <h2 data-testid="recipe-title">{food.strMeal}</h2>

          <ShareBTN />
          <button type="button" data-testid="favorite-btn">
            <img src={ favoritIcon } alt="favorite" />
          </button>

          <p data-testid="recipe-category">{food.strCategory}</p>
          <h3>Ingredients</h3>
          <div>
            {
              createIngredientAndMeasureArray()
                .map((item, ind) => (
                  <p
                    key={ item[0] }
                    data-testid={ `${ind}-ingredient-name-and-measure` }
                  >
                    {`-${item[0]}-${item[1]}`}
                  </p>
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
          <div className={ Style['card-container'] }>
            {
              recomendedDrinks.map((item, ind) => (
                <Card
                  key={ item.idDrink }
                  title={ item.strDrink }
                  index={ ind }
                  type="recomendation"
                  image={ item.strDrinkThumb }
                  style={ Style }
                />
              ))
            }
          </div>
          {shownStartRecipeBtn === 'start' && (
            <button
              data-testid="start-recipe-btn"
              type="button"
              className={ Style['fixed-btn'] }
              onClick={ handleBtnStartRecipe }
            >
              Start recipe

            </button>)}

          {shownStartRecipeBtn === 'inProgress'
              && (
                <button
                  data-testid="start-recipe-btn"
                  type="button"
                  className={ Style['fixed-btn'] }
                >
                  Continue Recipe

                </button>)}
        </>
      )}
    </div>
  );
}

export default FoodRecipe;
