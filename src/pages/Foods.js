import React from 'react';
import { useSelector } from 'react-redux';
import Card from '../components/Card';
import Header from '../components/Header';
import Footer from '../components/Footer';

const maxNumber = 12;
function Foods() {
  const meals = useSelector(({ recipesReducer }) => recipesReducer.meals);
  let newFoods = [];

  if (meals) {
    newFoods = meals.slice(0, maxNumber);
  }
  return (
    <div>
      <Header hasSearch title="Foods" />

      <div>
        {
          meals && newFoods.map(({ idMeal, strMealThumb, strMeal }, index) => (
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
