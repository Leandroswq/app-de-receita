import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import getCocktail from '../API/drinkAPI';
import Style from './css/ExploreFoodsAndDrinks.module.css';

function ExploreDrink() {
  const history = useHistory();

  async function getAPI() {
    const { drinks } = await getCocktail();
    const { idDrink } = drinks[0];
    history.push(`/drinks/${idDrink}`);
  }
  return (
    <div className={ Style.container }>
      <Header title="Explore Drinks" />

      <Link
        to="/explore/drinks/ingredients"
        type="button"
        data-testid="explore-by-ingredient"
      >
        By Ingredient
      </Link>
      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ getAPI }
      >
        Surprise me!
      </button>
      <Footer />
    </div>
  );
}

export default ExploreDrink;
