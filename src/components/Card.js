import PropTypes from 'prop-types';
import React from 'react';

function Card({ title, image, index, type, style }) {
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
      className={ style ? style.card : undefined }
    >
      <img
        src={ image }
        alt={ title }
        data-testid={ `${index}-card-img` }
        className={ style ? style.card__image : undefined }
      />
      <h2
        data-testid={ dataTestIdTitle() }
        className={ style ? style.card__title : undefined }
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
  style: PropTypes.objectOf(PropTypes.any),
};

Card.defaultProps = {
  type: 'recipe',
  style: false,
};

export default Card;
