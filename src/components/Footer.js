import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import styles from './css/Footer.module.css';

function Footer() {
  return (
    <footer data-testid="footer" className={ styles.footer }>
      <Link
        to="/drinks"
        type="button"
      >
        <img
          data-testid="drinks-bottom-btn"
          src={ drinkIcon }
          alt="Drink Icon"
        />
      </Link>
      <Link
        to="/explore"
        type="button"
      >
        <img
          data-testid="explore-bottom-btn"
          src={ exploreIcon }
          alt="Explore Icon"
        />
      </Link>
      <Link
        to="/foods"
        type="button"
      >
        <img
          data-testid="food-bottom-btn"
          src={ mealIcon }
          alt="Meal Icon"
        />
      </Link>
    </footer>
  );
}

export default Footer;
