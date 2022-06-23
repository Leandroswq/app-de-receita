import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import getFoods from '../API/getFoods';
import getNationalities from '../API/getNationalities';
import Card from '../components/Card';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { searchRecipesAc } from '../redux/actions/searchActions';
import Style from './css/ExploreFoodsNationality.module.css';

function ExploreFoodNationalities() {
  const [options, setOptions] = useState(['All']);
  const dispatch = useDispatch();
  useEffect(() => {
    async function getData() {
      const nationalities = await getNationalities();
      setOptions((prevState) => [...prevState, ...nationalities]);
      const data = await getFoods('', 'name');
      dispatch(searchRecipesAc(data));
    }
    getData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const maxNumber = 12;
  const meals = useSelector(({ recipesReducer }) => recipesReducer.meals);

  async function handleChange({ target }) {
    const { value } = target;
    console.log(value);
    let data;
    if (value === 'All') {
      data = await getFoods('', 'name');
    } else {
      data = await getFoods(value, 'area');
    }
    dispatch(searchRecipesAc(data));
  }
  return (
    <div className={ Style.container }>
      <Header hasSearch title="Explore Nationalities" />
      <form>
        <label htmlFor="explore">
          <select
            data-testid="explore-by-nationality-dropdown"
            id="explore"
            onChange={ handleChange }
          >
            {
              options && options.map((elem) => (
                <option
                  key={ elem }
                  data-testid={ `${elem}-option` }
                  value={ elem }
                >
                  { elem }
                </option>
              ))
            }
          </select>
        </label>
      </form>
      <div className={ Style['container-card'] }>
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

export default ExploreFoodNationalities;
