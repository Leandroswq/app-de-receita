/* eslint-disable react-hooks/exhaustive-deps */
// Se apagar a linha de cima o lint vai criar um loop infinito
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../components/Card';
import Header from '../components/Header';
import Footer from '../components/Footer';
import getFoods from '../API/getFoods';
import { searchRecipesAc } from '../redux/actions/searchActions';
import { foodsCategoriesAction } from '../redux/actions/categoriesActions';

const maxNumber = 12;
function Foods() {
  const meals = useSelector(({ recipesReducer }) => recipesReducer.meals);
  const { mealsCategories } = useSelector((state) => state.categoriesReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    async function getData() {
      const response = await getFoods('', 'name');
      dispatch(searchRecipesAc(response));
    }

    async function setCategories() {
      const categories = await getFoods('', 'categories');
      dispatch(foodsCategoriesAction(categories));
    }

    if (!meals || meals.length === 0) {
      getData();
    }
    if (mealsCategories.length === 0) {
      setCategories();
    }
  }, []);

  useEffect(() => () => {
    // Alterar a estrutura desse useEffect pode gerar loop infinito
    dispatch(searchRecipesAc({ meals: [] }));
  }, [] /* manter esse array a esquerda vazi */);
  const magicNumber5 = 5;
  return (
    <div>
      <Header hasSearch title="Foods" />
      <div>
        <button data-testid="All-category-filter" type="button">All</button>
        {
          mealsCategories.slice(0, magicNumber5)
            .map((categorie) => (
              <button
                key={ categorie.strCategory }
                data-testid={ `${categorie.strCategory}-category-filter` }
                type="button"
              >
                {categorie.strCategory}
              </button>
            ))
        }
      </div>

      <div>
        {
          meals && meals.slice(0, maxNumber)
            .map(({ idMeal, strMealThumb, strMeal }, index) => (
              <Card
                title={ strMeal }
                image={ strMealThumb }
                key={ idMeal }
                index={ index }
              />
            ))
        }
      </div>
      <Footer />
    </div>
  );
}

export default Foods;
