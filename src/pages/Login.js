import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Style from './Login.module.css';
import { setLocalStorage } from '../helpers';

export default function Login({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [valid, setValid] = useState(false);

  const handleClick = () => {
    setLocalStorage('user', { email });
    setLocalStorage('mealsToken', 1);
    setLocalStorage('cocktailsToken', 1);
    history.push('/foods');
  };

  useEffect(() => {
    const regEx = /^[\w.-]+@[\w.-]+\.[\w]+(\.[\w]+)?$/i;
    const checkEmail = regEx.test(email);
    const numberMin = 6;
    const checkPassword = password.length > numberMin;
    setValid(checkEmail === true && checkPassword === true);
  }, [email, password]);

  return (
    <div className={ Style.container }>
      <form>
        <label htmlFor="email">
          <input
            data-testid="email-input"
            type="email"
            autoComplete="false"
            className={ Style.button }
            id="email"
            onChange={ ({ target }) => setEmail(target.value) }
            placeholder="Email"
          />
        </label>
        <label htmlFor="senha">
          <input
            data-testid="password-input"
            type="password"
            autoComplete="false"
            className={ Style.button }
            id="senha"
            onChange={ ({ target }) => setPassword(target.value) }
            placeholder="Password"
          />
        </label>
        <button
          data-testid="login-submit-btn"
          type="button"
          disabled={ !valid }
          onClick={ handleClick }
        >
          Enter
        </button>
      </form>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
