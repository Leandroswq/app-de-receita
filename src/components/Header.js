import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import Style from './css/Header.module.css';
import FavoriteLink from './FavoriteLink';
import SearchBar from './SearchBar';

function Header({ hasSearch, title }) {
  const history = useHistory();
  const [showInput, setShowInput] = useState(false);

  return (
    <div className={ Style.container }>
      <div className={ Style.header }>
        <h3 data-testid="page-title">{ title }</h3>
        <div>
          <FavoriteLink />
          <button
            type="button"
            onClick={ () => history.push('/profile') }
          >
            <img src={ profileIcon } data-testid="profile-top-btn" alt="profile" />
          </button>
        </div>
      </div>
      {hasSearch && (
        <button
          type="button"
          className={ Style.icon }
          onClick={ () => setShowInput((prev) => !prev) }
        >
          Find your dishes
          <img src={ searchIcon } data-testid="search-top-btn" alt="search" />
        </button>
      )}
      {showInput && (
        <SearchBar />
      )}
    </div>
  );
}

Header.propTypes = {
  hasSearch: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

Header.defaultProps = {
  hasSearch: false,
};

export default Header;
