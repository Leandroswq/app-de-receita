import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExploreDrink() {
  return (
    <div>
      <Header title="Explore Drinks" />
      <p>Explore Drink</p>
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
      >
        Surprise me!
      </button>
      <Footer />
    </div>
  );
}

export default ExploreDrink;
