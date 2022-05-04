/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getDrinks from '../API/getDrinks';
import shareIcon from '../images/shareIcon.svg';
import favoritIcon from '../images/whiteHeartIcon.svg';
import { filterValuesFromObjectToArray } from '../helpers';
import Card from '../components/Card';
import getFoods from '../API/getFoods';
import Style from './css/Recipe.module.css';

const magicNumber6 = 6;

function DrinkRecipe() {
  const { id } = useParams();
  const [drink, setDrink] = useState(undefined);
  const [recomendedFood, setRecomendedFood] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await getDrinks(id, 'id');
      setDrink(response.drinks[0]);
    }
    async function setFoods() {
      const response = await getFoods('', 'name');
      const data = response.meals
        .slice(0, magicNumber6);
      console.log('data', data);
      setRecomendedFood(data);
    }
    getData();
    setFoods();
    console.log('set');
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
  console.log(recomendedFood, 'aqui');
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

          <button type="button" data-testid="share-btn">
            <img src={ shareIcon } alt="share" />
          </button>
          <button type="button" data-testid="favorite-btn">
            <img src={ favoritIcon } alt="favorite" />
          </button>

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
          <button data-testid="start-recipe-btn" type="button">Start recipe</button>
        </>
      )}
    </div>
  );
}

export default DrinkRecipe;
