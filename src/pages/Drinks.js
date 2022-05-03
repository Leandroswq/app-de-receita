/* eslint-disable react-hooks/exhaustive-deps */
// Se apagar a linha de cima o lint vai criar um loop infinito
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import Header from '../components/Header';
import Footer from '../components/Footer';
import getDrinks from '../API/getDrinks';
import { searchRecipesAc } from '../redux/actions/searchActions';
import { drinksCategoriesAction } from '../redux/actions/categoriesActions';


const magicNumber5 = 5;
const maxNumber = 12;
const categorieToggle = {
  categorie0: false,
  categorie1: false,
  categorie2: false,
  categorie3: false,
  categorie4: false,
};
function Drinks() {
  const [toggle, setToggle] = useState(categorieToggle);
  const drinks = useSelector(({ recipesReducer }) => recipesReducer.drinks);
  const { drinksCategories } = useSelector((state) => state.categoriesReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    async function getData() {
      const response = await getDrinks('', 'name');
      dispatch(searchRecipesAc(response));
    }

    async function setCategories() {
      const categories = await getDrinks('', 'categoriesList');
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

  async function handleCategorieBtnClick(categorie, toggleBtn = 'All') {
    let response;
    if (categorie === 'All' || toggle[toggleBtn] === true) {
      response = await getDrinks('', 'name');
      setToggle(categorieToggle);
    } else {
      response = await getDrinks(categorie, 'categorie');
      const toggleAux = { ...categorieToggle };
      toggleAux[toggleBtn] = true;
      setToggle(toggleAux);
    }
    dispatch(searchRecipesAc(response));
  }

  return (
    <div>
      <Header hasSearch title="Drinks" />
      <div>
        <button
          data-testid="All-category-filter"
          type="button"
          onClick={ () => handleCategorieBtnClick('All') }

        >
          All

        </button>
        {
          drinksCategories.slice(0, magicNumber5)
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
      <div>
        {
          drinks && drinks.slice(0, maxNumber)
            .map(({ idDrink, strDrinkThumb, strDrink }, index) => (
              <Link key={ idDrink } to={ `/drinks/${idDrink}` }>
                <Card
                  title={ strDrink }
                  image={ strDrinkThumb }
                  key={ idDrink }
                  index={ index }
                />
                /

              </Link>
            ))
        }
      </div>
      <Footer />
    </div>
  );
}

export default Drinks;
