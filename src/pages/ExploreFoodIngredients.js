import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Card from '../components/Card';
import Header from '../components/Header';
import Footer from '../components/Footer';
import getFoods from '../API/getFoods';
import { searchFoodIngredients } from '../redux/actions/ingredientsActions';
import { searchRecipesAc } from '../redux/actions/searchActions';

function ExploreFoodIngredients() {
  const { foodIngredient } = useSelector((state) => state.ingredientsReducer);
  const dispatch = useDispatch();
  const { push } = useHistory();
  const magicNumber12 = 12;

  useEffect(() => {
    async function fetchIngredient() {
      const foods = await getFoods(null, 'ingredientList');
      dispatch(searchFoodIngredients(foods));
    }
    if (foodIngredient.length < 1) {
      fetchIngredient();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function searchItem(filter) {
    const data = await getFoods(filter, 'ingredient');
    dispatch(searchRecipesAc(data));
    push('/foods');
  }

  return (
    <div>
      <Header title="Explore Ingredients" />
      <div>
        {
          foodIngredient.slice(0, magicNumber12).map((item, index) => (
            <button
              key={ item.strIngredient }
              type="button"
              onClick={ () => searchItem(item.strIngredient) }
            >
              <Card
                title={ item.strIngredient }
                image={ `https://www.themealdb.com/images/ingredients/${item.strIngredient}-Small.png` }
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

export default ExploreFoodIngredients;
