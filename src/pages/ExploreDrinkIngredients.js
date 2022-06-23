import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Style from './css/ExploreIngrents.module.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Card from '../components/Card';
import getDrinks from '../API/getDrinks';
import { searchDrinksIngredients } from '../redux/actions/ingredientsActions';
import { searchRecipesAc } from '../redux/actions/searchActions';

function ExploreDrinkIngredients() {
  const { drinkIngredient } = useSelector((state) => state.ingredientsReducer);
  const dispatch = useDispatch();
  const { push } = useHistory();

  const magicNumber12 = 12;

  useEffect(() => {
    async function fetchIngredient() {
      const drinks = await getDrinks(null, 'ingredientList');
      dispatch(searchDrinksIngredients(drinks));
    }
    if (drinkIngredient.length < 1) {
      fetchIngredient();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function searchItem(filter) {
    const data = await getDrinks(filter, 'ingredient');
    dispatch(searchRecipesAc(data));
    push('/drinks');
  }

  return (
    <div className={ Style.container }>
      <Header title="Explore Ingredients" />
      <div className={ Style['container-card'] }>
        {
          drinkIngredient.slice(0, magicNumber12).map((item, index) => (
            <button
              key={ item.strIngredient1 }
              onClick={ () => searchItem(item.strIngredient1) }
              type="button"
            >
              <Card
                title={ item.strIngredient1 }
                image={ `https://www.thecocktaildb.com/images/ingredients/${item.strIngredient1}-Small.png` }
                type="ingredients"
                index={ index }
              />
            </button>
          ))
        }
      </div>
      <Footer />
    </div>
  );
}

export default ExploreDrinkIngredients;
