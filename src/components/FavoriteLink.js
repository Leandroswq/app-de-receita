import React from 'react';
import { useHistory } from 'react-router-dom';
import icon from '../images/readHeartIcon.svg';
import Style from './css/FavoriteLink.module.css';

function FavoriteLink() {
  const history = useHistory();
  const handleClick = () => {
    history.push('/favorite-recipes');
  };
  return (
    <button type="button" className={ Style.button } onClick={ handleClick }>
      <img src={ icon } alt="favorites" />
    </button>
  );
}

export default FavoriteLink;
