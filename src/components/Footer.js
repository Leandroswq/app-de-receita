import React from 'react';
import { NavLink } from 'react-router-dom';
import { MdFoodBank, MdLocalBar, MdExplore } from 'react-icons/md';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import styles from './css/Footer.module.css';
import './css/activeNavLinkFooter.css';

function Footer() {
  return (
    <footer data-testid="footer" className={ styles.container }>
      <NavLink
        to="/drinks"
        type="button"
        activeClassName="activeNavLinkFooter"
      >
        <img
          data-testid="drinks-bottom-btn"
          src={ drinkIcon }
          alt="Drink Icon"
        />
        <MdLocalBar />
      </NavLink>
      <NavLink
        to="/explore"
        type="button"
        activeClassName="activeNavLinkFooter"
      >
        <img
          data-testid="explore-bottom-btn"
          src={ exploreIcon }
          alt="Explore Icon"
        />
        <MdExplore />
      </NavLink>
      <NavLink
        to="/foods"
        type="button"
        activeClassName="activeNavLinkFooter"
      >
        <img
          data-testid="food-bottom-btn"
          src={ mealIcon }
          alt="Meal Icon"
        />
        <MdFoodBank />
      </NavLink>
    </footer>
  );
}

export default Footer;
