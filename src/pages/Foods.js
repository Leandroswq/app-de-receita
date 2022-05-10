/* eslint-disable react-hooks/exhaustive-deps */
// Se apagar a linha de cima o lint vai criar um loop infinito
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Style from './css/FoodsAndDrinks.module.css';
import Card from '../components/Card';
import Header from '../components/Header';
import Footer from '../components/Footer';
import getFoods from '../API/getFoods';
import { searchRecipesAc } from '../redux/actions/searchActions';
import { foodsCategoriesAction } from '../redux/actions/categoriesActions';

const magicNumber5 = 5;
const maxNumber = 12;
const categorieToggle = {
  categorie0: false,
  categorie1: false,
  categorie2: false,
  categorie3: false,
  categorie4: false,
};
function Foods() {
  const [toggle, setToggle] = useState(categorieToggle);
  const meals = useSelector(({ recipesReducer }) => recipesReducer.meals);
  const { mealsCategories } = useSelector((state) => state.categoriesReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    async function getData() {
      const response = await getFoods('', 'name');
      dispatch(searchRecipesAc(response));
    }

    async function setCategories() {
      const categories = await getFoods('', 'categoriesList');
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

  async function handleCategorieBtnClick(categorie, toggleBtn = 'All') {
    let response;
    if (categorie === 'All' || toggle[toggleBtn] === true) {
      response = await getFoods('', 'name');
      setToggle(categorieToggle);
    } else {
      response = await getFoods(categorie, 'categorie');
      const toggleAux = { ...categorieToggle };
      toggleAux[toggleBtn] = true;
      setToggle(toggleAux);
    }
    dispatch(searchRecipesAc(response));
  }

  return (
    <div className={ Style.container }>
      <Header hasSearch title="Foods" />
      <div className={ Style.filters }>
        <button
          data-testid="All-category-filter"
          type="button"
          onClick={ () => handleCategorieBtnClick('All') }
        >
          All

        </button>
        {
          mealsCategories.slice(0, magicNumber5)
            .map((categorie, index) => (
              <button
                key={ categorie.strCategory }
                data-testid={ `${categorie.strCategory}-category-filter` }
                type="button"
                onClick={ () => handleCategorieBtnClick(categorie.strCategory,
                  `categorie${index}`) }
              >
                {categorie.strCategory}
              </button>
            ))
        }
      </div>

      <div className={ Style.content }>
        {
          meals && meals.slice(0, maxNumber)
            .map(({ idMeal, strMealThumb, strMeal }, index) => (
              <Link key={ idMeal } to={ `/foods/${idMeal}` }>
                <Card
                  title={ strMeal }
                  image={ strMealThumb }
                  index={ index }
                />
              </Link>
            ))
        }
      </div>
      <Footer />
    </div>
  );
}

export default Foods;
