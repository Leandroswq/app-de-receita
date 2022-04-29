import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import getMeal from '../API/foodAPI';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExploreFood() {
  const history = useHistory();

  async function getAPI() {
    const { meals } = await getMeal();
    const { idMeal } = meals[0];
    history.push(`/foods/${idMeal}`);
  }

  return (
    <div>
      <Header title="Explore Foods" />
      <p>Explore Food</p>
      <Link
        to="/explore/foods/ingredients"
        type="button"
        data-testid="explore-by-ingredient"
      >
        By Ingredient
      </Link>
      <Link
        to="/explore/foods/nationalities"
        type="button"
        data-testid="explore-by-nationality"
      >
        By Nationality
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

export default ExploreFood;
