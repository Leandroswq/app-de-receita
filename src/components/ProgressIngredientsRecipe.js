/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { filterValuesFromObjectToArray, getLocalStorage, setLocalStorage }
from '../helpers';

const disableButtonAux = (func, ingredientArray) => {
  if (func) {
    const disabled = ingredientArray.some((item) => !item[1]);
    func(disabled);
  }
};

function ProgressIngredientsRecipe({ recipe, type, id, disableButton }) {
  const [ingredientsUsed, setIngredientsUsed] = useState([]);
  const mealsOrCocktails = type === 'food' ? 'meals' : 'cocktails';

  useEffect(() => {
    const ingredients = filterValuesFromObjectToArray(/strIngredient/i, recipe)
      .map((item) => [item[1], false]);
    const inProgressRecipes = getLocalStorage('inProgressRecipes');
    if (inProgressRecipes && inProgressRecipes[mealsOrCocktails][id]) {
      const auxInProgressRecipes = inProgressRecipes[mealsOrCocktails][id];
      ingredients.forEach((item, ind) => {
        const auxForEach = auxInProgressRecipes
          .some((value) => value === item[0]);
        if (auxForEach) {
          ingredients[ind][1] = true;
        }
      });
    } else {
      setLocalStorage('inProgressRecipes', {
        cocktails: {},
        meals: {},
      });
    }

    disableButtonAux(disableButton, ingredients);

    setIngredientsUsed(ingredients);
  }, []);

  const createIngredientAndMeasureArray = () => {
    const ingredient = filterValuesFromObjectToArray(/strIngredient/i, recipe);
    const measure = filterValuesFromObjectToArray(/strMeasure/i, recipe);
    const measureAndIngredient = ingredient.map((item, ind) => {
      const ing = item[1];
      const meas = measure[ind] ? measure[ind][1] : '';
      return [ing, meas];
    });
    return measureAndIngredient;
  };
  const handleIngredientsChange = (ind) => {
    const ingredientsaAux = [...ingredientsUsed];
    ingredientsaAux[ind] = [ingredientsaAux[ind][0], !ingredientsaAux[ind][1]];
    const inProgressRecipes = getLocalStorage('inProgressRecipes');
    inProgressRecipes[mealsOrCocktails][id] = ingredientsaAux
      .filter((item) => item[1])
      .map((item) => item[0]);
    setLocalStorage('inProgressRecipes', inProgressRecipes);
    setIngredientsUsed(ingredientsaAux);
    disableButtonAux(disableButton, ingredientsaAux);
  };

  return (
    <div>
      {ingredientsUsed.length > 0 && (
        <>
          {
            createIngredientAndMeasureArray()
              .map((item, ind) => (
                <label
                  key={ `ingredient-${ind}` }
                  htmlFor={ `ingredient-${ind}` }
                  data-testid={ `${ind}-ingredient-step` }
                >
                  <input
                    type="checkbox"
                    name={ `ingredient-${ind}` }
                    id={ `ingredient-${ind}` }
                    checked={ ingredientsUsed[ind][1] }
                    onChange={ () => handleIngredientsChange(ind) }
                  />
                  {`${item[0]}${item[1]}`}
                </label>
              ))
          }
        </>)}
    </div>
  );
}
ProgressIngredientsRecipe.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.any).isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  disableButton: PropTypes.func,

};
ProgressIngredientsRecipe.defaultProps = {
  disableButton: undefined,
};
export default ProgressIngredientsRecipe;
