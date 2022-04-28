import React from 'react';
import { useSelector } from 'react-redux';
import Card from '../components/Card';
import Header from '../components/Header';

const maxNumber = 12;
function Drinks() {
  const drinks = useSelector(({ recipesReducer }) => recipesReducer.drinks);
  let newDrinks = [];

  if (drinks) {
    newDrinks = drinks.slice(0, maxNumber);
  }
  console.log(newDrinks);
  return (
    <div>
      <Header hasSearch title="Drinks" />
      <div>
        {
          drinks && newDrinks.map(({ idDrink, strDrinkThumb, strDrink }, index) => (
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
