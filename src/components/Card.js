import PropTypes from 'prop-types';
import React from 'react';

function Card({ title, image, index }) {
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <img src={ image } alt={ title } data-testid={ `${index}-card-img` } />
      <h2 data-testid={ `${index}-card-name` }>{title}</h2>
    </div>
  );
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default Card;
