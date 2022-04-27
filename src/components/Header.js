import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Style from './css/Header.module.css';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';

function Header({ hasSearch, title }) {
  const history = useHistory();
  const [showInput, setShowInput] = useState(false);
  const [search, setSearch] = useState('');
  return (
    <div className={ Style.header }>
      <button
        type="button"
        className={ Style.icon }
        onClick={ () => history.push('/profile') }
      >
        <img src={ profileIcon } data-testid="profile-top-btn" alt="profile" />
      </button>
      <h3 data-testid="page-title">{ title }</h3>
      {hasSearch && (
        <button
          type="button"
          className={ Style.icon }
          onClick={ () => setShowInput((prev) => !prev) }
        >
          <img src={ searchIcon } data-testid="search-top-btn" alt="search" />
        </button>
      )}
      {showInput && (
        <input
          data-testid="search-input"
          value={ search }
          onChange={ () => setSearch(value) }
        />
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
