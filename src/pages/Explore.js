import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Style from './css/Explore.module.css';

function Explore() {
  return (
    <div className={ Style.container }>
      <div>
        <Header title="Explore" />
      </div>
      <Link
        to="/explore/foods"
        type="button"
        data-testid="explore-foods"
      >
        Explore Foods
      </Link>
      <Link
        to="/explore/drinks"
        type="button"
        data-testid="explore-drinks"
      >
        Explore Drinks
      </Link>
      <Footer />
    </div>
  );
}

export default Explore;
