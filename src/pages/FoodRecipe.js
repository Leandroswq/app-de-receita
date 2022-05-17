/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import getFoods from '../API/getFoods';
import { filterValuesFromObjectToArray, statusRecipes } from '../helpers';
import Card from '../components/Card';
import getDrinks from '../API/getDrinks';
import Style from './css/Recipe.module.css';
import ShareBTN from '../components/ShareBTN';
import FavoriteBTN from '../components/FavoriteBTN';

const magicNumber6 = 6;

function FoodRecipe() {
  const { id } = useParams();
  const [food, setFood] = useState(undefined);
  const [recomendedDrinks, setRecomendedDrinks] = useState([]);
  const [shownStartRecipeBtn, setShownStartRecipeBtn] = useState(false);
  const { push } = useHistory();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    async function getData() {
      const response = await getFoods(id, 'id');
      setFood(response.meals[0]);
    }
    async function setDrinks() {
      const response = await getDrinks('', 'name');
      const data = response.drinks
        .slice(0, magicNumber6);
      const dataAux = [];
      data.forEach((value, ind) => {
        if (ind % 2 === 0) {
          dataAux.push([value, data[ind + 1]]);
        }
      });
      setRecomendedDrinks(dataAux);
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

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
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
          <div className={ Style.titleAndIcons }>
            <h2 data-testid="recipe-title">{food.strMeal}</h2>
            <div className={ Style.icons }>
              <ShareBTN />
              <FavoriteBTN recipe={ food } />
            </div>
          </div>
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
          <Carousel
            className="p-3"
            tabIndex={ index }
            activeIndex={ index }
            onSelect={ handleSelect }
            variant="dark"
          >
            {
              recomendedDrinks.map((item, ind) => (
                <Carousel.Item key={ item[0].strDrink }>
                  <div className={ Style.card }>
                    <Card
                      title={ item[0].strDrink }
                      index={ ind * 2 }
                      type="recomendation"
                      image={ item[0].strDrinkThumb }
                    />
                    <Card
                      title={ item[1].strDrink }
                      index={ (ind * 2) + 1 }
                      type="recomendation"
                      image={ item[1].strDrinkThumb }
                    />
                  </div>
                </Carousel.Item>
              ))
            }
          </Carousel>
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
                  onClick={ handleBtnStartRecipe }

                >
                  Continue Recipe

                </button>)}
        </>
      )}
    </div>
  );
}

export default FoodRecipe;
