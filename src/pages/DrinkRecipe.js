/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import getDrinks from '../API/getDrinks';
import getFoods from '../API/getFoods';
import Card from '../components/Card';
import FavoriteBTN from '../components/FavoriteBTN';
import ShareBTN from '../components/ShareBTN';
import { filterValuesFromObjectToArray, statusRecipes } from '../helpers';
import Style from './css/Recipe.module.css';

const magicNumber6 = 6;

function DrinkRecipe() {
  const { id } = useParams();
  const [drink, setDrink] = useState(undefined);
  const [recomendedFood, setRecomendedFood] = useState([]);
  const [shownStartRecipeBtn, setShownStartRecipeBtn] = useState(false);
  const { push } = useHistory();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    async function getData() {
      const response = await getDrinks(id, 'id');
      setDrink(response.drinks[0]);
    }
    async function setFoods() {
      const response = await getFoods('', 'name');
      const data = response.meals.slice(0, magicNumber6);
      const dataAux = [];
      data.forEach((value, ind) => {
        if (ind % 2 === 0) {
          dataAux.push([value, data[ind + 1]]);
        }
      });
      setRecomendedFood(dataAux);
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

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
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
          <div className={ Style.titleAndIcons }>
            <h2 data-testid="recipe-title">{drink.strDrink}</h2>
            <div className={ Style.icons }>
              <ShareBTN tooltipPosition="top" />
              <FavoriteBTN recipe={ drink } />
            </div>
          </div>
          <p data-testid="recipe-category">{drink.strAlcoholic}</p>
          <h3>Ingredients</h3>
          <div className={ Style.ingredients }>
            {createIngredientAndMeasureArray().map((item, ind) => (
              <p
                key={ item[0] }
                className={ Style.ingredient }
                data-testid={ `${ind}-ingredient-name-and-measure` }
              >
                {`-${item[0]}-${item[1]}`}
              </p>
            ))}
          </div>
          <h3>Instructions</h3>
          <p data-testid="instructions">{drink.strInstructions}</p>
          <Carousel
            className="p-3"
            tabIndex={ index }
            activeIndex={ index }
            onSelect={ handleSelect }
            variant="dark"
          >
            {recomendedFood.map((item, ind) => (
              <Carousel.Item key={ item[0].idMeal }>
                <div className={ Style.card }>
                  <Card
                    title={ item[0].strMeal }
                    index={ ind * 2 }
                    type="recomendation"
                    image={ item[0].strMealThumb }
                  />
                  <Card
                    title={ item[1].strMeal }
                    index={ ind * 2 + 1 }
                    type="recomendation"
                    image={ item[1].strMealThumb }
                  />
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
          {shownStartRecipeBtn === 'start' && (
            <button
              data-testid="start-recipe-btn"
              type="button"
              className={ `${Style['fixed-btn']} ${Style['start-recipe']}` }
              onClick={ handleBtnStartRecipe }
            >
              Start recipe
            </button>
          )}

          {shownStartRecipeBtn === 'inProgress' && (
            <button
              data-testid="start-recipe-btn"
              type="button"
              className={ `${Style['fixed-btn']} ${Style['continue-recipe']}` }
              onClick={ handleBtnStartRecipe }
            >
              Continue Recipe
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default DrinkRecipe;
