/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getDrinks from '../API/getDrinks';
import shareIcon from '../images/shareIcon.svg';
import favoritIcon from '../images/whiteHeartIcon.svg';
import { filterValuesFromObjectToArray } from '../helpers';

function DrinkRecipe() {
  const { id } = useParams();
  const [drink, setDrink] = useState(undefined);

  useEffect(() => {
    async function getData() {
      const response = await getDrinks(id, 'id');
      setDrink(response.drinks[0]);
    }
    getData();
  }, []);

  const createIngredientAndMeasureArray = () => {
    const ingredient = filterValuesFromObjectToArray(/strIngredient/i, drink);
    const measure = filterValuesFromObjectToArray(/strMeasure/i, drink);
    console.log(ingredient);
    console.log(measure);
    const measureAndIngredient = ingredient.map((item, ind) => {
      const ing = item[1];
      const meas = measure[ind] ? measure[ind][1] : '';
      return [ing, meas];
    });
    return measureAndIngredient;
  };
  console.log(drink);
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

          <div data-testid={ `${0}-recomendation-card` }>Receitas recomendadas</div>
          <div data-testid={ `${1}-recomendation-card` }>Receitas recomendadas</div>
          <button data-testid="start-recipe-btn" type="button">Start recipe</button>
        </>
      )}
    </div>
  );
}

export default DrinkRecipe;
