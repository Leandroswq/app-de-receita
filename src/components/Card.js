import PropTypes from 'prop-types';
import React from 'react';
import Style from './css/Card.module.css';

function Card({ title, image, index, type }) {
  const dataTestIdCard = () => {
    switch (type) {
    case 'recipe':
      return `${index}-recipe-card`;
    case 'ingredients':
      return `${index}-ingredient-card`;
    case 'recomendation':
      return `${index}-recomendation-card`;
    default:
      break;
    }
  };

  const dataTestIdTitle = () => {
    switch (type) {
    case 'recomendation':
      return `${index}-recomendation-title`;
    default:
      return `${index}-card-name`;
    }
  };

  return (
    <div
      data-testid={ dataTestIdCard() }
      className={ Style.container }
    >
      <img
        src={ image }
        alt={ title }
        data-testid={ `${index}-card-img` }
      />
      <h2
        data-testid={ dataTestIdTitle() }
      >
        {title}

      </h2>
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
