/* eslint-disable react-hooks/exhaustive-deps */
// Se apagar a linha de cima o lint vai criar um loop infinito
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../components/Card';
import Header from '../components/Header';
import Footer from '../components/Footer';
import getDrinks from '../API/getDrinks';
import { searchRecipesAc } from '../redux/actions/searchActions';
import { drinksCategoriesAction } from '../redux/actions/categoriesActions';

const maxNumber = 12;
function Drinks() {
  const drinks = useSelector(({ recipesReducer }) => recipesReducer.drinks);
  const { drinksCategories } = useSelector((state) => state.categoriesReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    async function getData() {
      const response = await getDrinks('', 'name');
      dispatch(searchRecipesAc(response));
    }

    async function setCategories() {
      const categories = await getDrinks('', 'categories');
      dispatch(drinksCategoriesAction(categories));
    }
    if (!drinks || drinks.length === 0) {
      getData();
    }
    if (drinksCategories.length === 0) {
      setCategories();
    }
  }, []);

  useEffect(() => () => {
    // Alterar a estrutura desse useEffect pode gerar loop infinito
    dispatch(searchRecipesAc({ drinks: [] }));
  }, [] /* manter esse array a esquerda vazio */);
  const magicNumber5 = 5;

  return (
    <div>
      <Header hasSearch title="Drinks" />
      <div>
        <button data-testid="All-category-filter" type="button">All</button>
        {
          drinksCategories.slice(0, magicNumber5)
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
          drinks && drinks.slice(0, maxNumber)
            .map(({ idDrink, strDrinkThumb, strDrink }, index) => (
              <Card
                title={ strDrink }
                image={ strDrinkThumb }
                key={ idDrink }
                index={ index }
              />
            ))
        }
      </div>
      <Footer />
    </div>
  );
}

export default Drinks;
