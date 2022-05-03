import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import Style from './css/Login.module.css';
import { setLocalStorage } from '../helpers';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [valid, setValid] = useState(false);
  const history = useHistory();
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
            className={ Style.input }
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
            className={ Style.input }
            id="senha"
            onChange={ ({ target }) => setPassword(target.value) }
            placeholder="Password"
          />
        </label>
        <button
          data-testid="login-submit-btn"
          type="button"
          className={ Style.button }
          disabled={ !valid }
          onClick={ handleClick }
        >
          Enter
        </button>
      </form>
    </div>
  );
}
