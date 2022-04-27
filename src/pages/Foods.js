import React from 'react';
import { useSelector } from 'react-redux';
import Card from '../components/Card';
import Header from '../components/Header';

function Foods() {
  const meals = useSelector(({ recipesReducer }) => recipesReducer.meals);

  console.log(meals);
  return (
    <div>
      <Header hasSearch title="Foods" />
      <div>
        {
          meals.map(({ idMeal, strMealThumb, strMeal }, index) => (
            <Card
              title={ strMeal }
              image={ strMealThumb }
              key={ idMeal }
              index={ index }
            />
          ))
        }
      </div>
    </div>
  );
}

export default Foods;
