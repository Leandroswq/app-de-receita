/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import getDrinks from '../API/getDrinks';
import { filterValuesFromObjectToArray, statusRecipes } from '../helpers';
import Card from '../components/Card';
import getFoods from '../API/getFoods';
import Style from './css/Recipe.module.css';
import ShareBTN from '../components/ShareBTN';
import FavoriteBTN from '../components/FavoriteBTN';

const magicNumber6 = 6;

function DrinkRecipe() {
  const { id } = useParams();
  const [drink, setDrink] = useState(undefined);
  const [recomendedFood, setRecomendedFood] = useState([]);
  const [shownStartRecipeBtn, setShownStartRecipeBtn] = useState(false);
  const { push } = useHistory();

  useEffect(() => {
    async function getData() {
      const response = await getDrinks(id, 'id');
      setDrink(response.drinks[0]);
    }
    async function setFoods() {
      const response = await getFoods('', 'name');
      const data = response.meals
        .slice(0, magicNumber6);
      setRecomendedFood(data);
    }
    setShownStartRecipeBtn(statusRecipes(id, 'cocktails'));
    getData();
    setFoods();
  }, []);

  const createIngredientAndMeasureArray = () => {
    const ingredient = filterValuesFromObjectToArray(/strIngredient/i, drink);
    const measure = filterValuesFromObjectToArray(/strMeasure/i, drink);
    const measureAndIngredient = ingredient.map((item, ind) => {
      const ing = item[1];
      const meas = measure[ind] ? measure[ind][1] : '';
      return [ing, meas];
    });
    return measureAndIngredient;
  };

  const handleBtnStartRecipe = () => {
    push(`/drinks/${id}/in-progress`);
  };

  return (
    <div className={ Style.container }>

      {drink !== undefined && (
        <>
          <img
            src={ drink.strDrinkThumb }
            alt={ drink.strDrink }
            data-testid="recipe-photo"
            className={ Style['recipe-image'] }
          />
          <h2 data-testid="recipe-title">{drink.strDrink}</h2>

          <ShareBTN />
          <FavoriteBTN recipe={ drink } />

          <p data-testid="recipe-category">{drink.strAlcoholic}</p>
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
          <p data-testid="instructions">{drink.strInstructions}</p>
          <div className={ Style['card-container'] }>
            {
              recomendedFood.map((item, ind) => (
                <Card
                  key={ item.idMeal }
                  title={ item.strMeal }
                  index={ ind }
                  type="recomendation"
                  image={ item.strMealThumb }
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

export default DrinkRecipe;
