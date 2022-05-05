import PropTypes from 'prop-types';
import React from 'react';

function CardDoneRecipes({ data, index }) {
  const { name, image, category, doneDate, tags } = data;
  return (
    <div>
      <img src={ image } alt={ name } data-testid={ `${index}-horizontal-image` } />
      <h6 data-testid={ `${index}-horizontal-top-text` }>{category}</h6>
      <h3 data-testid={ `${index}-horizontal-name` }>{name}</h3>
      <h5 data-testid={ `${index}-horizontal-done-date` }>{doneDate}</h5>
      <shareIcon data-testid={ `${index}-horizontal-share-btn` } />
      {
        tags && tags.map((elem) => (
          <p
            key={ elem }
            data-testid={ `${index}-${elem}-horizontal-tag` }
          >
            {elem}
          </p>))
      }
    </div>
  );
}

CardDoneRecipes.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    category: PropTypes.string,
    doneDate: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default CardDoneRecipes;
