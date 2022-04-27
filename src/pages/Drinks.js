import React from 'react';
import { useSelector } from 'react-redux';
import Card from '../components/Card';
import Header from '../components/Header';

function Drinks() {
  const drinks = useSelector(({ recipesReducer }) => recipesReducer.drinks);
  return (
    <div>
      <Header hasSearch title="Drinks" />
      <div>
        {
          drinks.map(({ idDrink, strDrinkThumb, strDrink }, index) => (
            <Card
              title={ strDrink }
              image={ strDrinkThumb }
              key={ idDrink }
              index={ index }
            />
          ))
        }
      </div>
    </div>
  );
}

export default Drinks;
