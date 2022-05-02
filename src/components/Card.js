import PropTypes from 'prop-types';
import React from 'react';

function Card({ title, image, index, type }) {
  const dataTestIdType = () => {
    switch (type) {
    case 'recipe':
      return `${index}-recipe-card`;
    case 'ingredients':
      return `${index}-ingredient-card`;
    default:
      break;
    }
  };
  return (
    <div data-testid={ dataTestIdType() }>
      <img src={ image } alt={ title } data-testid={ `${index}-card-img` } />
      <h2 data-testid={ `${index}-card-name` }>{title}</h2>
    </div>
  );
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  type: PropTypes.string,
};

Card.defaultProps = {
  type: 'recipe',
};

export default Card;
