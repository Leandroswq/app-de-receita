import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import FavoriteBTN from './FavoriteBTN';
import ShareBTN from './ShareBTN';
import Style from './css/CardDoneRecipes.module.css';

function CardDoneRecipes({ data, index, setData }) {
  const { name, image, category, doneDate, tags,
    nationality, type, alcoholicOrNot, id } = data;
  let auxType;
  if (type === 'food') {
    auxType = 'foods';
  } else auxType = 'drinks';
  return (
    <div className={ Style.container }>
      <Link to={ `/${auxType}/${id}` }>
        <img
          className="w-100"
          src={ image }
          alt={ name }
          data-testid={ `${index}-horizontal-image` }
        />
        <h3 data-testid={ `${index}-horizontal-name` }>{name}</h3>
      </Link>
      <span>{nationality}</span>
      <h6 data-testid={ `${index}-horizontal-top-text` }>
        {alcoholicOrNot || `${nationality} - ${category}`}
      </h6>
      <h5 data-testid={ `${index}-horizontal-done-date` }>{doneDate}</h5>
      <ShareBTN
        dataTestid={ `${index}-horizontal-share-btn` }
        recipeType={ auxType }
        idCard={ id }
      />
      {
        tags && tags.map((elem) => (
          <p
            key={ elem }
            data-testid={ `${index}-${elem}-horizontal-tag` }
          >
            {elem}
          </p>))
      }
      <FavoriteBTN
        dataTestid={ `${index}-horizontal-favorite-btn` }
        recipe={ data }
        setData={ setData }
      />
    </div>
  );
}

CardDoneRecipes.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    category: PropTypes.string,
    doneDate: PropTypes.string,
    nationality: PropTypes.string,
    alcoholicOrNot: PropTypes.string,
    type: PropTypes.string,
    id: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  index: PropTypes.number.isRequired,
  setData: PropTypes.func,
};

CardDoneRecipes.defaultProps = {
  setData: () => {},
};

export default CardDoneRecipes;
